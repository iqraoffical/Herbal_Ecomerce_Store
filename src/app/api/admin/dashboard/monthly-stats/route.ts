import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET() {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    const [totalOrders, pendingOrders, totalRevenue, totalProducts] = await Promise.all([
      client.fetch(
        `count(*[_type == "order" && createdAt >= $startOfMonth && createdAt <= $endOfMonth])`,
        { startOfMonth, endOfMonth }
      ),
      client.fetch(
        `count(*[_type == "order" && orderStatus == "pending" && createdAt >= $startOfMonth && createdAt <= $endOfMonth])`,
        { startOfMonth, endOfMonth }
      ),
      client.fetch(
        `*[_type == "order" && orderStatus != "cancelled" && createdAt >= $startOfMonth && createdAt <= $endOfMonth]{totalAmount}`,
        { startOfMonth, endOfMonth }
      ).then(orders => Array.isArray(orders) ? orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) : 0),
      client.fetch(`count(*[_type == "product"])`),
    ]);

    return NextResponse.json({
      totalOrders: totalOrders || 0,
      pendingOrders: pendingOrders || 0,
      totalRevenue: totalRevenue || 0,
      totalProducts: totalProducts || 0,
    });
  } catch (error) {
    console.error('Monthly stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monthly stats' },
      { status: 500 }
    );
  }
}
