import { NextRequest, NextResponse } from 'next/server';
import { serverClient } from '@/sanity/lib/client';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    // Remove readonly fields
    delete updates._id;
    delete updates._type;
    delete updates._createdAt;
    delete updates._updatedAt;
    delete updates._rev;

    const result = await serverClient
      .patch(id)
      .set(updates)
      .commit({ autoGenerateArrayKeys: true, skipCrossDatasetReferenceValidation: true });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Product update error:', error);
    return NextResponse.json(
      { error: 'Failed to update product', detail: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Step 1: Find all orders referencing this product
    const ordersRef = await serverClient.fetch(
      `*[_type == "order" && references("${id}")] { _id }`
    );

    // Step 2: Clear items from those orders
    for (const order of ordersRef) {
      await serverClient.patch(order._id).set({ items: [] }).commit();
    }

    // Step 3: Delete the product
    await serverClient.delete(id);
    try { await serverClient.delete(`drafts.${id}`); } catch {}

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Product delete error:', msg);
    return NextResponse.json(
      { error: 'Failed to delete product', detail: msg },
      { status: 500 }
    );
  }
}
