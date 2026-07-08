import { client } from './client'
import {
  productsQuery,
  featuredProductsQuery,
  productsByCategoryQuery,
  productBySlugQuery,
  categoriesQuery,
  testimonialsQuery,
  newArrivalsQuery,
  searchProductsQuery,
  relatedProductsQuery,
} from './queries'

export interface Product {
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

export interface Category {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  imageUrl?: string
}

export interface Testimonial {
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

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  return await client.fetch(productsQuery)
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  return await client.fetch(featuredProductsQuery)
}

// Fetch products by category
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return await client.fetch(productsByCategoryQuery, { categorySlug })
}

// Fetch single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await client.fetch(productBySlugQuery, { slug })
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  return await client.fetch(categoriesQuery)
}

// Fetch testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  return await client.fetch(testimonialsQuery)
}

// Fetch new arrivals
export async function getNewArrivals(): Promise<Product[]> {
  return await client.fetch(newArrivalsQuery)
}

// Search products
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  return await client.fetch(searchProductsQuery, { searchTerm })
}

// Get related products
export async function getRelatedProducts(
  categorySlug: string,
  productSlug: string
): Promise<Product[]> {
  return await client.fetch(relatedProductsQuery, { categorySlug, productSlug })
}
