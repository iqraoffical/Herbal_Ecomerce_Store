# 🚀 QUICK REFERENCE GUIDE

## 📍 URLs

| Resource | URL |
|----------|-----|
| **Homepage** | http://localhost:3003 |
| **Shop** | http://localhost:3003/shop |
| **Cart** | http://localhost:3003/cart |
| **Sanity Studio** | http://localhost:3003/studio |

## 🎯 Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📦 Add Products in 3 Steps

### Step 1: Create Category
1. Go to http://localhost:3003/studio
2. Click **"Categories"** → **"+ Create"**
3. Fill in:
   - Name: `Herbal Oils`
   - Slug: Auto-generated
   - Description: Optional
   - Upload image: Optional
4. Click **"Publish"**

### Step 2: Add Product
1. Click **"Products"** → **"+ Create"**
2. **Required fields**:
   - Name: `Pure Herbal Hair Oil`
   - Slug: Auto-generated
   - Image: Upload product photo
   - Category: Select `Herbal Oils`
   - Price: `1700`
   - Description: Short description
   - Stock Quantity: `50`
3. **Optional fields**:
   - Original Price: `2000` (for discount)
   - Benefits: Click "+ Add item" to add benefits
   - Ingredients: Click "+ Add item" to add ingredients
   - Usage: How to use instructions
   - Toggle **"Featured"** to show on homepage
4. Click **"Publish"**

### Step 3: Test on Website
1. Go to http://localhost:3003
2. Product appears in featured section
3. Go to http://localhost:3003/shop
4. Product appears in product grid
5. Click product to see details
6. Click **"Add to Cart"**
7. Cart badge shows item count
8. Go to http://localhost:3003/cart
9. Product is in cart ✅

## 🛒 Shopping Cart Features

### Add to Cart
```typescript
// Any page with products
<Button onClick={() => addToCart(product)}>
  Add to Cart
</Button>
```

### Cart Functions Available
```typescript
import { useCart } from '@/context/CartContext'

const {
  items,              // All cart items
  addToCart,          // Add product
  removeFromCart,     // Remove product
  updateQuantity,     // Update quantity
  clearCart,          // Clear all items
  getCartTotal,       // Get total price
  getCartCount,       // Get item count
} = useCart()
```

### Cart Persistence
- ✅ Automatically saves to localStorage
- ✅ Survives page refresh
- ✅ No login required

## 🎨 Common Tasks

### Add Multiple Products
1. In Sanity Studio, create one product
2. Click **"Duplicate"** button at bottom
3. Change name, slug, image
4. Click **"Publish"**
5. Repeat for more products

### Change Product Stock
1. Go to Sanity Studio
2. Click product to edit
3. Update **"Stock Quantity"**
4. Click **"Publish"**
5. Stock updates immediately on website

### Mark Product as Featured
1. Edit product in Sanity
2. Toggle **"Featured Product"** to ON
3. Click **"Publish"**
4. Product appears on homepage

### Add Product Images Gallery
1. Edit product in Sanity
2. Scroll to **"Additional Images"**
3. Click **"+ Add item"**
4. Upload multiple images
5. Click **"Publish"**
6. Gallery appears on product page

## 🔍 Sanity Schemas Reference

### Product Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | ✅ | Product name |
| slug | Slug | ✅ | URL identifier |
| image | Image | ✅ | Main photo |
| images | Array | ❌ | Gallery |
| category | Reference | ✅ | Product category |
| price | Number | ✅ | Current price |
| originalPrice | Number | ❌ | Original price |
| description | Text | ✅ | Short description |
| longDescription | Blocks | ❌ | Rich text |
| benefits | Array | ❌ | Benefit list |
| ingredients | Array | ❌ | Ingredient list |
| usage | Text | ❌ | Usage instructions |
| stockQuantity | Number | ✅ | Available stock |
| sku | String | ❌ | Stock keeping unit |
| weight | Number | ❌ | Weight in grams |
| isFeatured | Boolean | ❌ | Show on homepage |
| isNewArrival | Boolean | ❌ | New badge |
| rating | Number | ❌ | Rating 0-5 |

### Category Fields
| Field | Type | Required |
|-------|------|----------|
| name | String | ✅ |
| slug | Slug | ✅ |
| description | Text | ❌ |
| image | Image | ❌ |

### Testimonial Fields
| Field | Type | Required |
|-------|------|----------|
| customerName | String | ✅ |
| customerImage | Image | ❌ |
| rating | Number | ✅ |
| testimonial | Text | ✅ |
| product | Reference | ❌ |
| isVerified | Boolean | ❌ |

## 🐛 Troubleshooting

### Products not showing?
```bash
# Check if products are published in Sanity Studio
# Go to: http://localhost:3003/studio

# Check browser console for errors
# Open DevTools (F12) → Console tab

# Restart dev server
npm run dev
```

### Cart not working?
```bash
# Check browser console
# Clear localStorage:
localStorage.clear()
# Refresh page
```

### Sanity Studio not loading?
```bash
# Check environment variables
cat .env.local

# Should show:
# NEXT_PUBLIC_SANITY_PROJECT_ID=jfxnntpa
# NEXT_PUBLIC_SANITY_DATASET=production
# NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Build errors?
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

## 📊 File Structure Quick Reference

```
herbal_ecomweb/
├── src/
│   ├── app/
│   │   ├── components/        # UI components
│   │   │   ├── Navbar.tsx    # Navigation with cart badge
│   │   │   ├── FeaturedProducts.tsx  # Homepage featured
│   │   │   └── ...
│   │   ├── shop/             # Shop page
│   │   ├── product/[slug]/   # Product detail
│   │   ├── cart/             # Shopping cart
│   │   └── layout.tsx        # Root layout with CartProvider
│   ├── context/
│   │   └── CartContext.tsx   # Cart state management
│   ├── sanity/
│   │   ├── lib/
│   │   │   ├── client.ts     # Sanity client
│   │   │   ├── fetch.ts      # Data functions
│   │   │   └── queries.ts    # GROQ queries
│   │   └── schemaTypes/      # Sanity schemas
│   │       ├── product.ts
│   │       ├── category.ts
│   │       ├── testimonial.ts
│   │       └── order.ts
├── .env.local                 # Environment variables
├── sanity.config.ts          # Sanity configuration
└── package.json              # Dependencies
```

## 💡 Pro Tips

1. **Always publish** after creating/editing in Sanity
2. **Upload high-quality images** (at least 800x800px)
3. **Use descriptive product names** for SEO
4. **Add benefits and ingredients** to increase conversions
5. **Mark bestsellers as featured** for homepage display
6. **Keep stock updated** to avoid overselling
7. **Test on mobile** - most users shop on phones
8. **Add multiple product images** for better view

## 🎯 Sample Product Data

Copy this structure when adding products:

```
Name: Pure Herbal Hair Oil
Slug: pure-herbal-hair-oil
Price: ₹1700
Original Price: ₹2000
Stock: 50

Description:
100% natural herbal oil enriched with Amla, Bhringraj, and Brahmi. Promotes hair growth, reduces hair fall, and adds natural shine.

Benefits:
• Reduces hair fall by 70%
• Promotes faster hair growth
• Strengthens hair roots
• Adds natural shine and softness
• Prevents premature graying

Ingredients:
• Amla (Indian Gooseberry)
• Bhringraj
• Brahmi
• Coconut Oil
• Neem Oil
• Hibiscus Extract

Usage:
Apply oil to scalp and hair. Massage gently for 5-10 minutes. Leave for 2-3 hours or overnight. Wash with mild herbal shampoo. Use 2-3 times per week for best results.

Featured: ✅ Yes
New Arrival: ❌ No
Rating: 4.8
```

## 🚀 Deploy to Production

### Vercel (Recommended)
```bash
# 1. Push code to GitHub
git add .
git commit -m "Complete herbal ecommerce with cart"
git push

# 2. Go to vercel.com
# 3. Import repository
# 4. Add environment variables:
#    - NEXT_PUBLIC_SANITY_PROJECT_ID
#    - NEXT_PUBLIC_SANITY_DATASET
#    - NEXT_PUBLIC_SANITY_API_VERSION
# 5. Deploy
```

### Environment Variables for Production
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=jfxnntpa
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## 📞 Support

### Documentation Files
- `README.md` - Project overview
- `SETUP_GUIDE.md` - Setup instructions
- `API_DOCUMENTATION.md` - API reference
- `SANITY_CART_GUIDE.md` - Backend & cart guide
- `FINAL_REPORT.md` - Complete report
- `QUICK_REFERENCE.md` - This file

### Useful Links
- Sanity Docs: https://www.sanity.io/docs
- Next.js Docs: https://nextjs.org/docs
- TypeScript: https://www.typescriptlang.org/docs

---

## ✅ Everything Working Checklist

- [ ] Open Sanity Studio at http://localhost:3003/studio
- [ ] Create at least 1 category
- [ ] Create at least 2 products
- [ ] Products appear on http://localhost:3003
- [ ] Products appear on http://localhost:3003/shop
- [ ] Can filter by category
- [ ] Can search products
- [ ] Can click product to see details
- [ ] Can add product to cart
- [ ] Cart badge shows item count
- [ ] Can view cart at http://localhost:3003/cart
- [ ] Can update quantity in cart
- [ ] Can remove items from cart
- [ ] Cart persists after page refresh

**If all checked ✅ - YOU'RE READY TO GO! 🎉**

---

**Last Updated**: June 7, 2026
**Status**: Production Ready ✅
**Build**: Successful ✅
**Cart**: Fully Functional ✅
**Sanity**: Configured ✅
