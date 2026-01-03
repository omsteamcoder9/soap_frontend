// order-api.ts - FULLY CORRECTED
import { Order, OrdersResponse, OrderResponse } from '@/types/order';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserOrders(token: string): Promise<Order[]> {
  try {
    console.log('🔄 Fetching orders from:', `${API_BASE_URL}/orders/my-orders`);
    
    const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch orders: ${response.status} - ${errorText}`);
    }

    const data: OrdersResponse = await response.json();
    console.log('✅ Backend response:', data);
    
    // FIX: Use 'orders' instead of 'data'
    return data.orders || [];
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    throw error;
  }
}

export async function getOrderById(orderId: string, token: string): Promise<Order> {
  try {
    console.log('🔄 Fetching order details for:', orderId);
    
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.status}`);
    }

    const data: OrderResponse = await response.json();
    console.log('✅ Order details:', data);
    
    // FIX: Use 'order' instead of 'data'
    return data.order;
  } catch (error) {
    console.error('❌ Error fetching order:', error);
    throw error;
  }
}


export async function cancelOrder(orderId: string, token: string, cancellationReason?: string): Promise<Order> {
  try {
    console.log('🔄 Cancelling order:', orderId);
    
    // Using Partial to make all properties optional
    const requestBody: Partial<{ cancellationReason: string }> = {};
    if (cancellationReason) {
      requestBody.cancellationReason = cancellationReason;
    }

    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      credentials: 'include'
    });

    console.log('📡 Cancel response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to cancel order: ${response.status} - ${errorText}`);
    }

    const data: OrderResponse = await response.json();
    console.log('✅ Order cancelled successfully:', data);
    
    return data.order;
  } catch (error) {
    console.error('❌ Error cancelling order:', error);
    throw error;
  }
}