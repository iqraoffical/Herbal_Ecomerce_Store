# Herbal Ecommerce - API Documentation

## Data Fetching Functions

All data fetching functions are located in `src/sanity/lib/fetch.ts` and use GROQ queries from `src/sanity/lib/queries.ts`.

### Products

#### `getProducts(): Promise<Product[]>`
Fetches all products from Sanity, ordered by creation date (newest first).

```typescript
import { getProducts } from '@/sanity/lib/fetch'

const products = await getProducts()
```

#### `getFeaturedProducts(): Promise<Product[]>`
Fetches up to 6 featured products (where `isFeatured === true`).

```typescript
import { getFeaturedProducts } from '@/sanity/lib/fetch'

const featured = await getFeaturedProducts()
```

#### `getProductsByCategory(categorySlug: string): Promise<Product[]>`
Fetches all products in a specific category.

```typescript
import { getProductsByCategory } from '@/sanity/lib/fetch'

const products = await getProductsByCategory('herbal-oils')
```

#### `getProductBySlug(slug: string): Promise<Product | null>`
Fetches a single product by its slug.

```typescript
import { getProductBySlug } from '@/sanity/lib/fetch'

const product = await getProductBySlug('pure-herbal-hair-oil')
```

#### `getNewArrivals(): Promise<Product[]>`
Fetches up to 8 new arrival products (where `isNewArrival === true`).

```typescript
import { getNewArrivals } from '@/sanity/lib/fetch'

const newProducts = await getNewArrivals()
```

#### `searchProducts(searchTerm: string): Promise<Product[]>`
Searches products by name, description, or category name.

```typescript
import { searchProducts } from '@/sanity/lib/fetch'

const results = await searchProducts('hair oil')
```

#### `getRelatedProducts(categorySlug: string, productSlug: string): Promise<Product[]>`
Fetches up to 4 related products from the same category (excluding the current product).

```typescript
import { getRelatedProducts } from '@/sanity/lib/fetch'

const related = await getRelatedProducts('herbal-oils', 'current-product-slug')
```

### Categories

#### `getCategories(): Promise<Category[]>`
Fetches all categories, ordered alphabetically by name.

```typescript
import { getCategories } from '@/sanity/lib/fetch'

const categories = await getCategories()
```

### Testimonials

#### `getTestimonials(): Promise<Testimonial[]>`
Fetches up to 10 recent testimonials, ordered by creation date.

```typescript
import { getTestimonials } from '@/sanity/lib/fetch'

const testimonials = await getTestimonials()
```

## TypeScript Interfaces

### Product
```typescript
interface Product {
  _id: string
  name: string
  slug: { current: string }
  imageUrl: string
  images?: string[]
  price: number
  originalPrice?: number
  description: string
  longDescription?: unknown[]
  benefits?: string[]
  ingredients?: string[]
  usage?: string
  category: {
    _id: string
    name: string
    slug: { current: string }
  }
  stockQuantity: number
  sku?: string
  weight?: number
  isFeatured?: boolean
  isNewArrival?: boolean
  rating?: number
}
```

### Category
```typescript
interface Category {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  imageUrl?: string
}
```

### Testimonial
```typescript
interface Testimonial {
  _id: string
  customerName: string
  customerImageUrl?: string
  rating: number
  testimonial: string
  product?: {
    _id: string
    name: string
    slug: { current: string }
  }
  isVerified: boolean
  createdAt: string
}
```

## GROQ Queries

All GROQ queries are defined in `src/sanity/lib/queries.ts`. Here are some examples:

### Get All Products
```groq
*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  "imageUrl": image.asset->url,
  price,
  originalPrice,
  description,
  category->{
    _id,
    name,
    slug
  },
  stockQuantity,
  isFeatured,
  isNewArrival,
  rating
}
```

### Get Single Product
```groq
*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  "imageUrl": image.asset->url,
  "images": images[].asset->url,
  price,
  originalPrice,
  description,
  longDescription,
  benefits,
  ingredients,
  usage,
  category->{
    _id,
    name,
    slug
  },
  stockQuantity,
  sku,
  weight,
  isFeatured,
  isNewArrival,
  rating
}
```

### Search Products
```groq
*[_type == "product" && (
  name match $searchTerm + "*" ||
  description match $searchTerm + "*" ||
  category->name match $searchTerm + "*"
)] | order(_createdAt desc) {
  // ... fields
}
```

## Using in Components

### Client Components (with useState/useEffect)

```typescript
'use client'

import { useState, useEffect } from 'react'
import { getProducts, type Product } from '@/sanity/lib/fetch'

export default function MyComponent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  )
}
```

### Server Components (direct async/await)

```typescript
import { getProducts } from '@/sanity/lib/fetch'

export default async function MyServerComponent() {
  const products = await getProducts()

  return (
    <div>
      {products.map(product => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  )
}
```

## Error Handling

All fetch functions are wrapped with try-catch blocks in components:

```typescript
try {
  const products = await getProducts()
  setProducts(products)
} catch (error) {
  console.error('Error fetching products:', error)
  toast.error('Failed to load products')
}
```

## Caching & Revalidation

The Sanity client is configured with `useCdn: true` for better performance. For production, you may want to add revalidation:

```typescript
export const revalidate = 60 // Revalidate every 60 seconds
```

## Image Optimization

Images are automatically optimized using Sanity's image pipeline:

```typescript
import Image from 'next/image'

<Image
  src={product.imageUrl}
  alt={product.name}
  width={200}
  height={200}
  className="object-contain"
/>
```

## Notes

- All queries use `useCdn: true` for better performance
- Image URLs are automatically generated using Sanity's asset pipeline
- Category relationships use Sanity references (`->` operator in GROQ)
- Dates are stored as ISO strings
- Stock quantity is required and must be >= 0
