# Sanity Backend & Shopping Cart - Complete Guide

## 🎯 Overview

Your herbal ecommerce website now has:
- **Sanity CMS Backend**: Headless CMS for managing products, categories, testimonials, and orders
- **Shopping Cart System**: Fully functional cart with localStorage persistence
- **Real-time Integration**: Frontend dynamically loads data from Sanity

## 📊 Sanity Backend Details

### Project Configuration
- **Project ID**: `jfxnntpa`
- **Dataset**: `production`
- **API Version**: `2024-01-01`
- **Studio URL**: http://localhost:3003/studio

### Sanity Schemas

#### 1. Product Schema (`src/sanity/schemaTypes/product.ts`)

**Fields**:
- `name` (string, required): Product name
- `slug` (slug, required): URL-friendly identifier
- `image` (image, required): Main product image
- `images` (array of images): Additional product images
- `category` (reference, required): Link to category
- `price` (number, required): Current price in rupees
- `originalPrice` (number): Original price for showing discounts
- `description` (text, required): Short description
- `longDescription` (array of blocks): Rich text description
- `benefits` (array of strings): Product benefits list
- `ingredients` (array of strings): Product ingredients list
- `usage` (text): How to use instructions
- `stockQuantity` (number, required): Available stock
- `sku` (string): Stock keeping unit
- `weight` (number): Weight in grams
- `isFeatured` (boolean): Show on featured section
- `isNewArrival` (boolean): Mark as new arrival
- `rating` (number): Average rating (0-5)

**Example Product Data**:
```json
{
  "name": "Pure Herbal Hair Oil",
  "slug": { "current": "pure-herbal-hair-oil" },
  "price": 1700,
  "originalPrice": 2000,
  "description": "100% natural herbal oil for hair growth and nourishment",
  "stockQuantity": 50,
  "benefits": [
    "Reduces hair fall",
    "Promotes hair growth",
    "Strengthens hair roots",
    "Adds natural shine"
  ],
  "ingredients": ["Amla", "Bhringraj", "Brahmi", "Coconut Oil", "Neem"],
  "usage": "Apply to scalp and hair, massage gently. Leave for 2-3 hours or overnight.",
  "isFeatured": true,
  "rating": 4.8
}
```

#### 2. Category Schema (`src/sanity/schemaTypes/category.ts`)

**Fields**:
- `name` (string, required): Category name
- `slug` (slug, required): URL-friendly identifier
- `description` (text): Category description
- `image` (image): Category image

**Example Categories**:
- Herbal Oils
- Herbal Teas
- Herbal Supplements
- Tinctures

#### 3. Testimonial Schema (`src/sanity/schemaTypes/testimonial.ts`)

**Fields**:
- `customerName` (string, required): Customer name
- `customerImage` (image): Customer photo
- `rating` (number, required): 1-5 star rating
- `testimonial` (text, required): Review text
- `product` (reference): Related product
- `isVerified` (boolean): Verified purchase badge
- `createdAt` (datetime): Review date

#### 4. Order Schema (`src/sanity/schemaTypes/order.ts`)

**Fields**:
- `orderNumber` (string, required): Unique order ID
- `customerName` (string, required): Customer name
- `customerEmail` (string, required): Customer email
- `customerPhone` (string): Contact number
- `shippingAddress` (object): Delivery address
- `items` (array): Order items with quantities
- `totalAmount` (number, required): Total order value
- `status` (string): pending, processing, shipped, delivered, cancelled
- `paymentStatus` (string): pending, paid, failed, refunded
- `createdAt` (datetime): Order date

### GROQ Queries

All queries are in `src/sanity/lib/queries.ts`:

1. **Get All Products**:
```groq
*[_type == "product"] | order(_createdAt desc) {
  _id, name, slug, "imageUrl": image.asset->url,
  price, originalPrice, description,
  category->{ _id, name, slug },
  stockQuantity, isFeatured, isNewArrival, rating
}
```

2. **Get Featured Products** (max 6):
```groq
*[_type == "product" && isFeatured == true] | order(_createdAt desc) [0...6]
```

3. **Get Products by Category**:
```groq
*[_type == "product" && category->slug.current == $categorySlug]
```

4. **Get Single Product**:
```groq
*[_type == "product" && slug.current == $slug][0]
```

5. **Search Products**:
```groq
*[_type == "product" && (
  name match $searchTerm + "*" ||
  description match $searchTerm + "*" ||
  category->name match $searchTerm + "*"
)]
```

### API Functions (`src/sanity/lib/fetch.ts`)

All functions are TypeScript typed:

```typescript
// Get all products
const products = await getProducts()

// Get featured products
const featured = await getFeaturedProducts()

// Get products by category
const oils = await getProductsByCategory('herbal-oils')

// Get single product
const product = await getProductBySlug('pure-herbal-hair-oil')

// Get all categories
const categories = await getCategories()

// Get testimonials
const testimonials = await getTestimonials()

// Get new arrivals
const newProducts = await getNewArrivals()

// Search products
const results = await searchProducts('hair oil')

// Get related products
const related = await getRelatedProducts('herbal-oils', 'current-slug')
```

## 🛒 Shopping Cart System

### Cart Context (`src/context/CartContext.tsx`)

The cart uses React Context API for global state management.

**Features**:
- ✅ Add products to cart
- ✅ Update quantities
- ✅ Remove items
- ✅ Clear entire cart
- ✅ Calculate totals
- ✅ Count items
- ✅ localStorage persistence
- ✅ Stock validation

**Cart Item Interface**:
```typescript
interface CartItem {
  _id: string
  name: string
  slug: string
  imageUrl: string
  price: number
  quantity: number
  stockQuantity: number
}
```

### Using the Cart

**1. Add to Cart**:
```typescript
import { useCart } from '@/context/CartContext'

const { addToCart } = useCart()

// Add product
addToCart({
  _id: product._id,
  name: product.name,
  slug: product.slug.current,
  imageUrl: product.imageUrl,
  price: product.price,
  stockQuantity: product.stockQuantity,
})
```

**2. Update Quantity**:
```typescript
const { updateQuantity } = useCart()

// Set new quantity
updateQuantity(productId, newQuantity)
```

**3. Remove Item**:
```typescript
const { removeFromCart } = useCart()

removeFromCart(productId)
```

**4. Get Cart Info**:
```typescript
const { items, getCartTotal, getCartCount } = useCart()

const total = getCartTotal() // Total price
const count = getCartCount() // Total items
```

**5. Clear Cart**:
```typescript
const { clearCart } = useCart()

clearCart()
```

### Cart Features

#### Stock Validation
- Cannot add more than available stock
- Shows stock limit in error message
- Displays available quantity in cart

#### Persistence
- Cart saved to localStorage
- Survives page refreshes
- Loads automatically on mount

#### Toast Notifications
- Success: "Product added to cart"
- Error: "Stock limit reached"
- Info: "Quantity updated"

#### Cart Badge
- Shows total item count
- Red badge on navbar
- Updates in real-time

### Cart Page (`/cart`)

Features:
- View all cart items
- Update quantities with +/- buttons
- Remove individual items
- Clear entire cart
- See subtotal, shipping, and total
- Free shipping over ₹999
- Progress indicator for free shipping
- Proceed to checkout button
- Continue shopping link

**Shipping Logic**:
```typescript
const shipping = subtotal > 999 ? 0 : 99
const total = subtotal + shipping
```

## 🔌 Integration Points

### 1. Shop Page (`/shop`)
- Loads products from Sanity
- Category filtering (dynamic from Sanity)
- Search functionality
- Add to cart button on each product
- Real-time cart count in navbar

### 2. Product Detail Page (`/product/[slug]`)
- Loads single product from Sanity
- Shows related products
- Quantity selector
- Add multiple to cart
- Image gallery
- Benefits, ingredients, usage

### 3. Homepage (`/`)
- Featured products from Sanity
- Testimonials from Sanity
- Add to cart on featured products

### 4. Navbar
- Cart count badge
- Cart link
- Updates on cart changes

## 📝 How to Add Content

### Step 1: Access Sanity Studio
Go to: http://localhost:3003/studio

### Step 2: Create Categories
1. Click "Categories" in sidebar
2. Click "+ Create"
3. Fill in:
   - Name: e.g., "Herbal Oils"
   - Slug: Auto-generated (e.g., "herbal-oils")
   - Description: Optional
   - Image: Upload category image
4. Click "Publish"

### Step 3: Add Products
1. Click "Products" in sidebar
2. Click "+ Create"
3. Fill in required fields:
   - **Name**: Product name
   - **Slug**: Auto-generated from name
   - **Main Image**: Upload product image
   - **Category**: Select from dropdown
   - **Price**: e.g., 1700
   - **Description**: Short description
   - **Stock Quantity**: e.g., 50
4. Optional fields:
   - **Original Price**: For showing discount
   - **Additional Images**: Multiple images
   - **Benefits**: Add bullet points
   - **Ingredients**: List ingredients
   - **Usage**: How to use instructions
   - **Featured**: Toggle for homepage
   - **New Arrival**: Toggle for new badge
   - **Rating**: 0-5 stars
5. Click "Publish"

### Step 4: Add Testimonials
1. Click "Testimonials"
2. Click "+ Create"
3. Fill in:
   - Customer Name
   - Rating (1-5)
   - Testimonial text
   - Optional: Customer image
   - Optional: Related product
   - Toggle: Verified purchase
4. Click "Publish"

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=jfxnntpa
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Client Configuration
```typescript
// src/sanity/lib/client.ts
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // false for development
})
```

## 🎨 Cart UI Components

### Cart Badge (Navbar)
```typescript
<Badge className="cart-badge">
  {cartCount}
</Badge>
```

### Cart Item Card
- Product image (clickable to product page)
- Product name (clickable to product page)
- Stock badge
- Quantity controls (+/- buttons)
- Price per item
- Total price
- Remove button

### Order Summary
- Subtotal
- Shipping cost
- Free shipping progress
- Total (highlighted in green)
- Checkout button
- Continue shopping link

## 🚀 Testing the System

### 1. Test Sanity Backend
1. Add a category in Studio
2. Add a product with that category
3. Go to /shop - product should appear
4. Filter by category - should work
5. Search for product - should find it

### 2. Test Shopping Cart
1. Click "Add to Cart" on any product
2. Check navbar badge increases
3. Go to /cart - item should be there
4. Update quantity - total should update
5. Remove item - should disappear
6. Refresh page - cart should persist
7. Try adding more than stock - should show error

### 3. Test Cart Flow
1. Add multiple products
2. Update quantities
3. Check free shipping threshold
4. Clear cart - should empty
5. Add items again - should work

## 💡 Tips & Best Practices

1. **Always add stock quantity** to products in Sanity
2. **Mark bestsellers as featured** to show on homepage
3. **Add high-quality images** for better conversions
4. **Write detailed benefits** to help customers decide
5. **Use verified testimonials** for trust
6. **Keep stock updated** in Sanity
7. **Add multiple product images** for better view
8. **Use clear category names** for easy navigation

## 🐛 Troubleshooting

### Products not showing?
- Check Sanity Studio - are products published?
- Check browser console for errors
- Verify environment variables are correct

### Cart not persisting?
- Check browser localStorage
- Ensure JavaScript is enabled
- Clear cache and try again

### Images not loading?
- Upload images through Sanity Studio
- Check image URLs in Sanity
- Verify CORS settings

### Can't add to cart?
- Check stock quantity > 0
- Check console for errors
- Verify CartProvider wraps app

## 📊 Current Status

✅ **Working Features**:
- Sanity CMS fully configured
- All schemas created
- GROQ queries working
- Products loading from Sanity
- Categories filtering
- Search functionality
- Shopping cart with localStorage
- Add/update/remove cart items
- Cart persistence
- Stock validation
- Toast notifications
- Cart badge in navbar
- Responsive design

🔜 **Future Enhancements**:
- User authentication
- Order creation from cart
- Payment gateway integration
- Email notifications
- Order tracking
- Wishlist functionality
- Product reviews

---

**Everything is ready to use!** Start adding products in Sanity Studio and test the shopping cart functionality.
