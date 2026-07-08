# Herbal Ecommerce - Setup Guide

## Initial Setup

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=jfxnntpa
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-14
```

### 3. Start Development Server
```bash
npm run dev
```

## Sanity Studio Setup

### Access Studio
Navigate to: http://localhost:3000/studio

### Add Sample Data

#### 1. Create Categories
1. Go to "Categories" in Studio
2. Add these categories:
   - **Herbal Oils**
     - Slug: herbal-oils
     - Description: Natural herbal oils for hair and skin care
   - **Herbal Teas**
     - Slug: herbal-teas
     - Description: Organic herbal teas for wellness
   - **Herbal Supplements**
     - Slug: herbal-supplements
     - Description: Natural herbal supplements
   - **Tinctures**
     - Slug: tinctures
     - Description: Herbal tinctures and extracts

#### 2. Add Products
Example Product:
```
Name: Pure Herbal Hair Oil
Slug: pure-herbal-hair-oil
Category: Herbal Oils
Price: 1700
Original Price: 2000
Description: 100% natural herbal oil for hair growth and nourishment
Stock Quantity: 50
Benefits:
  - Reduces hair fall
  - Promotes hair growth
  - Strengthens hair roots
  - Adds natural shine
Ingredients:
  - Amla
  - Bhringraj
  - Brahmi
  - Coconut Oil
  - Neem
Usage: Apply to scalp and hair, massage gently. Leave for 2-3 hours or overnight. Wash with mild shampoo.
Featured: Yes
Rating: 4.8
```

#### 3. Add Testimonials
Example:
```
Customer Name: Ayesha Khan
Rating: 5
Testimonial: Amazing product! My hair fall reduced significantly within 3 weeks.
Verified Purchase: Yes
```

## Frontend Pages

### Available Routes
- `/` - Homepage
- `/shop` - All products
- `/shop?category=herbal-oils` - Category filtered
- `/product/[slug]` - Product details
- `/cart` - Shopping cart
- `/about` - About page
- `/studio` - Sanity Studio

## API Integration

### Fetching Products
```typescript
import { getProducts, getFeaturedProducts, getProductBySlug } from '@/sanity/lib/fetch'

// Get all products
const products = await getProducts()

// Get featured products
const featured = await getFeaturedProducts()

// Get single product
const product = await getProductBySlug('product-slug')
```

### Available Queries
- `getProducts()` - All products
- `getFeaturedProducts()` - Featured products (max 6)
- `getProductsByCategory(slug)` - Products by category
- `getProductBySlug(slug)` - Single product
- `getCategories()` - All categories
- `getTestimonials()` - Customer testimonials
- `getNewArrivals()` - New products
- `searchProducts(term)` - Search products
- `getRelatedProducts(categorySlug, productSlug)` - Related products

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Troubleshooting

### Build Errors
If you encounter build errors:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install --legacy-peer-deps`
3. Run `npm run build`

### Sanity Connection Issues
- Verify project ID in `.env.local`
- Check network connection
- Ensure Sanity dataset exists

### Image Loading Issues
- Images must be uploaded through Sanity Studio
- Verify image URLs in Sanity dashboard
- Check CORS settings in Sanity project

## Next Steps

1. **Add Products**: Populate your catalog through Sanity Studio
2. **Customize Design**: Modify components in `src/app/components/`
3. **Configure Payment**: Integrate payment gateway
4. **Set up Authentication**: Add user login/signup
5. **Deploy**: Deploy to Vercel or your preferred platform

## Support

For issues or questions:
- Check the main README.md
- Review Sanity documentation: https://www.sanity.io/docs
- Review Next.js documentation: https://nextjs.org/docs
