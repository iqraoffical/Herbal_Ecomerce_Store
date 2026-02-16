import pytest
from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Herbal Hair Oil API is running!"}

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "message": "API is running successfully"}

def test_create_order():
    order_data = {
        "name": "John Doe",
        "phone": "1234567890",
        "address": "123 Main St",
        "city": "Bangalore",
        "quantity": 2
    }
    response = client.post("/api/orders", json=order_data)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "John Doe"
    assert data["phone"] == "1234567890"
    assert data["quantity"] == 2
    assert data["status"] == "pending"
    assert "tracking_id" in data