import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Try exact slug first
    const exactSlug = decodeURIComponent(slug).toLowerCase();

    const product = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] {
        _id, name, slug,
        "imageUrl": image.asset->url, "images": images[].asset->url,
        price, originalPrice, description, longDescription,
        benefits, ingredients, usage,
        category->{ _id, name, slug },
        stockQuantity, sku, weight,
        isFeatured, isNewArrival, rating
      }`,
      { slug: exactSlug }
    );

    if (product) {
      return NextResponse.json(product);
    }

    // Try normalized slug (spaces → hyphens)
    const normalizedSlug = exactSlug
      .replace(/\s+/g, '-')
      .replace(/%20/g, '-')
      .replace(/-+/g, '-');

    const product2 = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0] {
        _id, name, slug,
        "imageUrl": image.asset->url, "images": images[].asset->url,
        price, originalPrice, description, longDescription,
        benefits, ingredients, usage,
        category->{ _id, name, slug },
        stockQuantity, sku, weight,
        isFeatured, isNewArrival, rating
      }`,
      { slug: normalizedSlug }
    );

    if (product2) {
      return NextResponse.json(product2);
    }

    // Search by name if slug fails
    const searchName = exactSlug.replace(/-/g, ' ').trim();
    const product3 = await client.fetch(
      `*[_type == "product" && lower(name) match $name][0] {
        _id, name, slug,
        "imageUrl": image.asset->url, "images": images[].asset->url,
        price, originalPrice, description, longDescription,
        benefits, ingredients, usage,
        category->{ _id, name, slug },
        stockQuantity, sku, weight,
        isFeatured, isNewArrival, rating
      }`,
      { name: searchName + '*' }
    );

    if (product3) {
      return NextResponse.json(product3);
    }

    return NextResponse.json(
      { error: `Product not found for slug: ${exactSlug}` },
      { status: 404 }
    );
  } catch (error: any) {
    console.error('Product API error:', error?.message || error);
    return NextResponse.json(
      { error: 'Failed to fetch product', detail: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
