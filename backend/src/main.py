from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from src.config.database import get_db, engine
from src.models.order_model import Base
from src.routes import order_routes, auth_routes
from src.utils.auth import verify_token
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from src.db_init import init_db

load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize default admin user
init_db()

# Initialize FastAPI app
app = FastAPI(
    title="Herbal Hair Oil API",
    description="Backend API for Herbal Hair Oil e-commerce platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # Expose authorization header for JWT
    expose_headers=["Access-Control-Allow-Origin"]
)

# HTTP Bearer token for admin routes
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

# Include routers
app.include_router(order_routes.router, prefix="/api", tags=["orders"])
app.include_router(auth_routes.router, prefix="/admin", tags=["admin"])

@app.get("/")
def read_root():
    return {"message": "Herbal Hair Oil API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running successfully"}