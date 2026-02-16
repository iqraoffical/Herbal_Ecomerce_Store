from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from datetime import timedelta
from src.config.database import get_db
from src.models.order_model import Admin
from src.schemas.order_schema import AdminLogin, Token
from src.utils.auth import authenticate_user, create_access_token, get_password_hash
from dotenv import load_dotenv
import os

load_dotenv()

router = APIRouter()
security = HTTPBearer()

@router.post("/login", response_model=Token)
def login_for_access_token(admin_login: AdminLogin, db: Session = Depends(get_db)):
    """
    Authenticate admin and return JWT token
    """
    # Get admin from database
    admin = db.query(Admin).filter(Admin.username == admin_login.username).first()
    
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify password
    if not authenticate_user(admin.hashed_password, admin_login.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": admin.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# Initialize default admin user if not exists
def initialize_admin(db: Session):
    """
    Initialize default admin user if not exists
    """
    admin_username = os.getenv("ADMIN_USERNAME", "admin")
    admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
    
    # Check if admin already exists
    existing_admin = db.query(Admin).filter(Admin.username == admin_username).first()
    
    if not existing_admin:
        # Create new admin with hashed password
        hashed_password = get_password_hash(admin_password)
        new_admin = Admin(username=admin_username, hashed_password=hashed_password)
        db.add(new_admin)
        db.commit()
        print(f"Default admin user created: {admin_username}")
    else:
        print(f"Admin user '{admin_username}' already exists")