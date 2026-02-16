import uvicorn
from src.db_init import init_db

if __name__ == "__main__":
    # Initialize database with default admin
    init_db()
    
    # Run the FastAPI application
    uvicorn.run(
        "src.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )