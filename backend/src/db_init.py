from sqlalchemy.orm import Session
from src.config.database import SessionLocal
from src.routes.auth_routes import initialize_admin

def init_db():
    """
    Initialize the database with default admin user
    """
    db: Session = SessionLocal()
    try:
        initialize_admin(db)
    finally:
        db.close()

if __name__ == "__main__":
    init_db()