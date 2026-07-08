import { groq } from 'next-sanity'

// Get all products
export const productsQuery = groq`*[_type == "product"] | order(_createdAt desc) {
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
}`

// Get featured products
export const featuredProductsQuery = groq`*[_type == "product" && isFeatured == true] | order(_createdAt desc) [0...6] {
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
  rating
}`

// Get products by category
export const productsByCategoryQuery = groq`*[_type == "product" && category->slug.current == $categorySlug] | order(_createdAt desc) {
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
  rating
}`

// Get single product by slug
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
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
}`

// Get all categories
export const categoriesQuery = groq`*[_type == "category"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  "imageUrl": image.asset->url
}`

// Get testimonials
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc) [0...10] {
  _id,
  customerName,
  "customerImageUrl": customerImage.asset->url,
  rating,
  testimonial,
  product->{
    _id,
    name,
    slug
  },
  isVerified,
  createdAt
}`

// Get new arrivals
export const newArrivalsQuery = groq`*[_type == "product" && isNewArrival == true] | order(_createdAt desc) [0...8] {
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
  rating
}`

// Search products
export const searchProductsQuery = groq`*[_type == "product" && (
  name match $searchTerm + "*" ||
  description match $searchTerm + "*" ||
  category->name match $searchTerm + "*"
)] | order(_createdAt desc) {
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
  rating
}`

// Get related products (same category, different product)
export const relatedProductsQuery = groq`*[_type == "product" && category->slug.current == $categorySlug && slug.current != $productSlug] | order(_createdAt desc) [0...4] {
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
  rating
}`
