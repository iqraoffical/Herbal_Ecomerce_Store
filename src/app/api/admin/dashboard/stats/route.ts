import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const dateFilter =
      startDate && endDate
        ? ` && createdAt >= $startDate && createdAt <= $endDate`
        : '';

    const productDateFilter =
      startDate && endDate
        ? ` && _createdAt >= $startDate && _createdAt <= $endDate`
        : '';

    const params: Record<string, string> = {};
    if (startDate && endDate) {
      params.startDate = startDate;
      params.endDate = endDate;
    }

    const [totalOrders, pendingOrders, revenueOrders, totalProducts] = await Promise.all([
      client.fetch(`count(*[_type == "order"${dateFilter}])`, params),
      client.fetch(`count(*[_type == "order" && orderStatus == "pending"${dateFilter}])`, params),
      client.fetch(`*[_type == "order" && orderStatus != "cancelled"${dateFilter}]{totalAmount}`, params),
      client.fetch(`count(*[_type == "product"${productDateFilter}])`, params),
    ]);

    const totalRevenue = Array.isArray(revenueOrders)
      ? revenueOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
      : 0;

    return NextResponse.json({
      totalOrders: totalOrders || 0,
      pendingOrders: pendingOrders || 0,
      totalRevenue,
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
