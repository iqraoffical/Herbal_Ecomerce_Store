import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await client.fetch(
      `*[_type == "order" && _id == $id][0] {
        _id,
        orderNumber,
        customerName,
        customerPhone,
        customerEmail,
        shippingAddress,
        items[] {
          ...,
          product-> {
            _id,
            name,
            "imageUrl": image.asset->url,
            slug
          }
        },
        totalAmount,
        orderStatus,
        paymentStatus,
        trackingId,
        notes,
        createdAt
      }`,
      { id }
    );

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
