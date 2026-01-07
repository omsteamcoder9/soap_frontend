// types/order.ts - UPDATED WITH PROPER selectedSize
export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string; // Backend uses 'image' not 'images'
  };
  quantity: number;
  price: number;
  name?: string; // Backend includes name
  selectedSize?: string; // ✅ CORRECT: This should be a STRING
}

export interface Order {
  _id: string;
  orderId: string;
  receipt?: string;
  user: string;
  products: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingFee?: number;
  taxAmount?: number;
  finalAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
  message?: string;
}

export interface OrderResponse {
  success: boolean;
  order: Order;
  message?: string;
}