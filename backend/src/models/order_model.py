from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.sql import func
from src.config.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String, index=True)
    address = Column(String)
    city = Column(String)
    product = Column(String, default="Herbal Hair Oil")
    quantity = Column(Integer, default=1)
    price = Column(Float, default=499.0)
    status = Column(String, default="pending")  # pending, shipped, delivered
    tracking_id = Column(String, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())