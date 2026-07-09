import { NextRequest, NextResponse } from 'next/server';
import { serverClient as client } from '@/sanity/lib/client';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await client.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { orderStatus, paymentStatus, trackingId, notes } = await request.json();

    const patchOp = client.patch(id);

    if (orderStatus) {
      patchOp.set({ orderStatus });
    }
    if (paymentStatus) {
      patchOp.set({ paymentStatus });
    }
    if (trackingId !== undefined) {
      patchOp.set({ trackingId });
    }
    if (notes !== undefined) {
      patchOp.set({ notes });
    }

    const result = await patchOp.commit();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Order status update error:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
