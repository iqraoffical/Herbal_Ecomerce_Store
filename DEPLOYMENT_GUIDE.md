# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- Git repository

### Steps
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Vercel](https://vercel.com/)
3. Click "New Project" and import your repository
4. Vercel will automatically detect it's a Next.js project
5. Add environment variables if needed (though this project doesn't require any for frontend)
6. Click "Deploy"

### Configuration
- Framework Preset: Next.js
- Build Command: `next build`
- Output Directory: `.next`
- Development Command: `next dev`

## Backend Deployment (Railway or Render)

### Option 1: Railway

#### Prerequisites
- Railway account
- PostgreSQL database

#### Steps
1. Sign up at [Railway](https://railway.app/)
2. Create a new project
3. Connect your GitHub repository
4. Add PostgreSQL plugin from the "Database" section
5. Set environment variables in "Variables" section:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   SECRET_KEY=your-super-secret-key-change-in-production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```
6. Deploy

### Option 2: Render

#### Prerequisites
- Render account
- PostgreSQL database

#### Steps
1. Sign up at [Render](https://render.com/)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Choose "Docker" as runtime
5. Use the provided Dockerfile
6. Set environment variables in "Environment Variables" section:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   SECRET_KEY=your-super-secret-key-change-in-production
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123
   ```
7. Set the start command to: `python run_server.py`

## Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost/herbal_hair_oil_db
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## Production Notes

### Frontend
- Update the API URL in the order page to point to your deployed backend
- Enable HTTPS in production
- Set up custom domain if needed

### Backend
- Change default admin credentials
- Use strong SECRET_KEY in production
- Set up SSL certificate
- Configure proper CORS for your frontend domain
- Monitor logs regularly

## Health Checks

### Frontend
- Homepage: `https://your-frontend-domain.vercel.app/`
- API routes will be tested automatically

### Backend
- Health check: `https://your-backend-domain.onrender.com/health`
- API docs: `https://your-backend-domain.onrender.com/docs`

## Troubleshooting

### Common Issues
1. **CORS errors**: Ensure your frontend domain is added to the CORS allow list in backend
2. **Database connection**: Verify DATABASE_URL is correctly configured
3. **JWT authentication**: Check that SECRET_KEY matches between deployments
4. **API endpoints**: Update frontend to use correct backend URL

### Logs
- Vercel: Access logs through the Vercel dashboard
- Railway/Render: Access logs through the respective dashboard

## Scaling Recommendations

### Frontend
- Leverage Vercel's global CDN
- Optimize images with Next.js Image component
- Implement caching strategies

### Backend
- Scale dynos/instances based on traffic
- Use connection pooling for database
- Implement caching for frequently accessed data
- Monitor resource usage