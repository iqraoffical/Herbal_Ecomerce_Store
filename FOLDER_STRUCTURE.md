# Complete Folder Structure

## Frontend (Next.js)
```
herbal_ecomweb/
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── .env.local (for local development)
├── .env.local.example
├── .next/ (generated)
├── data/
├── node_modules/ (generated)
├── public/
│   └── Images/
│       ├── hero-oil.png
│       ├── product-oil.png
│       ├── Bottleimage.png
│       ├── Heroimage.png
│       ├── leafimg.png
│       ├── Organic.png
│       ├── skin.png
│       ├── serum.png
│       ├── velvety1.png
│       ├── velvety2.png
│       ├── velvety3.png
│       ├── products/
│           ├── classwing.png
│           ├── holocane.png
│           ├── inamorata.png
│           └── lightcool.png
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── CTASection.tsx
│   │   │   ├── FeaturedProduct.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Product.tsx
│   │   │   ├── SecondSec.tsx
│   │   │   ├── Shop.tsx
│   │   │   ├── feature.tsx
│   │   │   └── AllProducts.tsx
│   │   ├── api/
│   │   │   └── order/
│   │   │       └── route.ts
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── delivery/
│   │   │   └── page.tsx
│   │   ├── order/
│   │   │   └── page.tsx
│   │   ├── product/
│   │   │   └── page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── dashboard/
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   ├── middleware.ts
│   └── product/
└── types/
```

## Backend (FastAPI)
```
backend/
├── .env
├── .env.example
├── Dockerfile
├── README.md
├── docker-compose.yml
├── requirements.txt
├── requirements-dev.txt
├── run_server.py
├── test_api.py
├── DEPLOYMENT_GUIDE.md
└── src/
    ├── config/
    │   └── database.py
    ├── models/
    │   └── order_model.py
    ├── routes/
    │   ├── auth_routes.py
    │   └── order_routes.py
    ├── schemas/
    │   └── order_schema.py
    ├── utils/
    │   └── auth.py
    ├── db_init.py
    └── main.py
```

## Environment Files

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=postgresql://username:password@localhost/herbal_hair_oil_db
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## Package Dependencies

### Frontend (package.json)
```
{
  "name": "herbal_ecomweb",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.525.0",
    "next": "15.3.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^3.4.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.21",
    "eslint": "^9",
    "eslint-config-next": "15.3.3",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.10",
    "typescript": "^5"
  }
}
```

### Backend (requirements.txt)
```
fastapi==0.115.0
uvicorn[standard]==0.32.0
sqlalchemy==2.0.35
psycopg2-binary==2.9.9
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-dotenv==1.0.1
asyncpg==0.29.0
pydantic==2.9.2
```

## API Endpoints

### Frontend API Routes
- `POST /api/order` - Handle order submission (Next.js API route)

### Backend API Routes
- `POST /admin/login` - Admin authentication
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/{id}` - Update order status (admin only)
- `GET /api/orders/{id}` - Get specific order

## Admin Dashboard Routes
- `/admin` - Admin login page
- `/admin/dashboard` - Admin dashboard

## Database Schema

### Orders Table
- id (Integer, Primary Key)
- name (String)
- phone (String)
- address (String)
- city (String)
- product (String, default: "Herbal Hair Oil")
- quantity (Integer, default: 1)
- price (Float, default: 499.0)
- status (String, default: "pending")
- tracking_id (String, unique)
- created_at (DateTime)
- updated_at (DateTime)

### Admins Table
- id (Integer, Primary Key)
- username (String, unique)
- hashed_password (String)
- created_at (DateTime)
```