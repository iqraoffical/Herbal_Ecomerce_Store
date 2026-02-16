from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum

class OrderStatus(str, Enum):
    pending = "pending"
    shipped = "shipped"
    delivered = "delivered"

# Schema for creating an order
class OrderCreate(BaseModel):
    name: str
    phone: str
    address: str
    city: str
    quantity: int = 1

# Schema for updating an order
class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    tracking_id: Optional[str] = None

# Schema for reading an order (includes computed fields)
class Order(BaseModel):
    id: int
    name: str
    phone: str
    address: str
    city: str
    product: str
    quantity: int
    price: float
    status: OrderStatus
    tracking_id: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Schema for admin login
class AdminLogin(BaseModel):
    username: str
    password: str

# Schema for admin token
class Token(BaseModel):
    access_token: str
    token_type: str

# Schema for token data
class TokenData(BaseModel):
    username: Optional[str] = None