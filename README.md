# Herbal Hair Oil E-commerce Platform

A complete e-commerce solution for a herbal hair oil brand with frontend (Next.js) and backend (FastAPI).

## 🌿 Features

### Frontend
- Modern, responsive design with herbal green theme
- Product showcase with detailed information
- Order form with validation
- Contact page with social media links
- Delivery information page
- WhatsApp integration for orders
- Mobile-first responsive design

### Backend
- JWT-based authentication for admin users
- Order management system
- CRUD operations for orders
- Tracking ID generation
- Status updates for orders
- Secure password hashing
- Proper error handling
- PostgreSQL database integration

### Admin Dashboard
- Login with JWT authentication
- View all orders in a table
- Update order status (pending, shipped, delivered)
- Add tracking IDs
- Real-time order management

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide React Icons

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- JWT Authentication
- Python 3.11

## 📁 Project Structure

```
herbal_ecomweb/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── product/
│   │   ├── order/
│   │   ├── contact/
│   │   ├── delivery/
│   │   └── admin/
│   ├── lib/
│   └── product/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routes/
│   │   └── utils/
│   ├── requirements.txt
│   ├── .env
│   ├── Dockerfile
│   └── docker-compose.yml
├── public/
│   └── Images/
└── types/
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- PostgreSQL

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.local.example .env.local
```

3. Set environment variables:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create environment file:
```bash
cp .env.example .env
```

5. Set environment variables in `.env`:
```env
DATABASE_URL=postgresql://username:password@localhost/herbal_hair_oil_db
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

6. Run the server:
```bash
python run_server.py
```

The backend will be available at `http://localhost:8000`

## 📡 API Endpoints

### Authentication
- `POST /admin/login` - Login as admin and get JWT token

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/{id}` - Update order status (admin only)
- `GET /api/orders/{id}` - Get a specific order

## 👥 Admin Dashboard

Access the admin dashboard at `/admin` with default credentials:
- Username: `admin`
- Password: `admin123`

## 📦 Order Flow

1. User visits product page and clicks "Order Now"
2. User fills order form with name, phone, address, city, and quantity
3. Order is submitted to backend API
4. Backend generates tracking ID and saves order
5. WhatsApp message is automatically generated with order details
6. Admin can view and update order status from dashboard

## 🚢 WhatsApp Integration

When an order is placed, a WhatsApp message is automatically generated in this format:
```
New Order 🌿
Name: [Customer Name]
Phone: [Customer Phone]
City: [Customer City]
Quantity: [Order Quantity]
```

## 🏗️ Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy with default settings

### Backend (Railway/Render)
1. Push backend code to GitHub
2. Import project in Railway/Render
3. Add PostgreSQL plugin
4. Set environment variables
5. Deploy

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 🔐 Security

- JWT tokens for admin authentication
- Passwords stored with bcrypt hashing
- Input validation on both frontend and backend
- CORS configured for secure cross-origin requests
- Environment variables for sensitive data

## 🧪 Testing

### Frontend
```bash
npm run build
npm run dev
```

### Backend
```bash
pytest test_api.py
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository.