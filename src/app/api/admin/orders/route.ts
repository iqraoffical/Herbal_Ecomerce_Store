import { NextRequest, NextResponse } from 'next/server';
import { client, serverClient } from '@/sanity/lib/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let filter = '*[_type == "order"';
    const params: Record<string, string | number> = {};

    if (status && status !== 'all') {
      filter += ' && orderStatus == $status';
      params.status = status;
    }

    if (search) {
      filter += ' && (orderNumber match $search || customerPhone match $search || customerName match $search)';
      params.search = `${search}*`;
    }

    filter += '] | order(createdAt desc)';

    const orders = await client.fetch( // read-only
      `${filter} {
        _id,
        orderNumber,
        customerName,
        customerPhone,
        customerEmail,
        shippingAddress,
        items,
        totalAmount,
        orderStatus,
        paymentStatus,
        trackingId,
        notes,
        createdAt
      }`,
      params
    );

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Generate order number
    const count = await client.fetch(`count(*[_type == "order"])`); // read-only
    const orderNumber = `ORD-${String(count + 1).padStart(4, '0')}`;

    const order = await serverClient.create({
      _type: 'order',
      orderNumber,
      ...data,
      orderStatus: data.orderStatus || 'pending',
      paymentStatus: data.paymentStatus || 'pending',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
