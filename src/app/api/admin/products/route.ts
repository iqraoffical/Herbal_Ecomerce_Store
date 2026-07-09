import { NextRequest, NextResponse } from 'next/server';
import { client, serverClient } from '@/sanity/lib/client';

export async function GET() {
  try {
    const products = await client.fetch(`*[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      slug,
      "imageUrl": image.asset->url,
      price,
      originalPrice,
      description,
      category-> {
        _id,
        name,
        slug
      },
      stockQuantity,
      isFeatured,
      isNewArrival,
      isAvailable,
      rating,
      benefits,
      ingredients,
      usage,
      sku,
      weight,
      _createdAt
    }`);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Ensure slug is in the correct format
    const slug = data.slug?.current
      ? data.slug
      : { current: data.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'untitled' };

    const product = await serverClient.create({
      _type: 'product',
      ...data,
      slug,
      image: data.image || undefined,
      isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
      isFeatured: data.isFeatured || false,
      isNewArrival: data.isNewArrival || false,
      stockQuantity: data.stockQuantity || 0,
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Product creation error:', message);
    return NextResponse.json(
      { error: 'Failed to create product', detail: message },
      { status: 500 }
    );
  }
}
