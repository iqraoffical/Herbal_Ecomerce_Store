# Herbal Hair Oil Backend API

Backend API for the Herbal Hair Oil e-commerce platform built with FastAPI and PostgreSQL.

## Features

- JWT-based authentication for admin users
- Order management system
- CRUD operations for orders
- Tracking ID generation
- Status updates for orders
- Secure password hashing
- Proper error handling
- CORS configuration

## Prerequisites

- Python 3.8+
- PostgreSQL database

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd herbal_hair_oil_backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your database credentials and secret keys.

5. Run the application:
```bash
python run_server.py
```

The API will be available at `http://localhost:8000`.

## API Endpoints

### Authentication
- `POST /admin/login` - Login as admin and get JWT token

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/{id}` - Update order status (admin only)
- `GET /api/orders/{id}` - Get a specific order

## Default Admin Credentials

Username: `admin`
Password: `admin123`

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - Secret key for JWT tokens
- `ALGORITHM` - Algorithm for JWT encoding (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES` - Token expiration time (default: 30)
- `ADMIN_USERNAME` - Admin username (default: admin)
- `ADMIN_PASSWORD` - Admin password (default: admin123)

## Database Models

### Order
- id: Integer (Primary Key)
- name: String
- phone: String
- address: String
- city: String
- product: String (default: "Herbal Hair Oil")
- quantity: Integer (default: 1)
- price: Float (default: 499.0)
- status: String (default: "pending")
- tracking_id: String (unique)
- created_at: DateTime
- updated_at: DateTime

### Admin
- id: Integer (Primary Key)
- username: String (unique)
- hashed_password: String
- created_at: DateTime