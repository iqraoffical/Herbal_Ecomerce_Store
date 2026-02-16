// src/app/api/order/route.ts
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // In a real application, you would:
    // 1. Validate the data
    // 2. Save to a database
    // 3. Send notifications
    // 4. Generate order ID
    
    // For this demo, we'll just simulate the process
    console.log('Order received:', data);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        orderId: `ORD-${Date.now()}`,
        message: 'Order placed successfully!' 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing order:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Failed to process order' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}