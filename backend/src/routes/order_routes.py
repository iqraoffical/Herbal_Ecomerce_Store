from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import random
import string
from src.config.database import get_db
from src.models.order_model import Order as OrderModel
from src.schemas.order_schema import Order, OrderCreate, OrderUpdate, OrderStatus
from src.utils.auth import verify_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()
security = HTTPBearer()

def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    username: str = payload.get("sub")
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return username

def generate_tracking_id():
    """Generate a unique tracking ID for orders"""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

@router.post("/orders", response_model=Order, status_code=status.HTTP_201_CREATED)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    """
    Create a new order
    """
    # Generate a unique tracking ID
    tracking_id = generate_tracking_id()
    
    # Create the order object
    db_order = OrderModel(
        name=order.name,
        phone=order.phone,
        address=order.address,
        city=order.city,
        quantity=order.quantity,
        tracking_id=tracking_id
    )
    
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    
    return db_order

@router.get("/orders", response_model=List[Order], dependencies=[Depends(get_current_admin)])
def get_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all orders (Admin only)
    """
    orders = db.query(OrderModel).offset(skip).limit(limit).all()
    return orders

@router.put("/orders/{order_id}", response_model=Order, dependencies=[Depends(get_current_admin)])
def update_order_status(
    order_id: int, 
    order_update: OrderUpdate, 
    db: Session = Depends(get_db)
):
    """
    Update order status (Admin only)
    """
    db_order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    
    if not db_order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with id {order_id} not found"
        )
    
    # Update fields if provided
    if order_update.status is not None:
        db_order.status = order_update.status.value
    
    if order_update.tracking_id is not None:
        db_order.tracking_id = order_update.tracking_id
    
    db.commit()
    db.refresh(db_order)
    
    return db_order

@router.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific order by ID
    """
    order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Order with id {order_id} not found"
        )
    
    return order