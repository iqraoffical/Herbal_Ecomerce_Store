import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client'; // read-only is fine for stats

export async function GET() {
  try {
    const [totalOrders, pendingOrders, totalRevenueResult, totalProducts] = await Promise.all([
      client.fetch(`count(*[_type == "order"])`),
      client.fetch(`count(*[_type == "order" && orderStatus == "pending"])`),
      client.fetch(`sum(*[_type == "order" && orderStatus != "cancelled"].totalAmount)`),
      client.fetch(`count(*[_type == "product"])`),
    ]);

    return NextResponse.json({
      totalOrders: totalOrders || 0,
      pendingOrders: pendingOrders || 0,
      totalRevenue: totalRevenueResult || 0,
      totalProducts: totalProducts || 0,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
