// types/cart.ts - Updated to support size
import { Product } from './product';

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
  selectedSize?: string; // ✅ ADDED: Size field
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
  size?: string; // ✅ ADDED: Size parameter for API
}

export interface UpdateCartItemData {
  quantity: number;
}

// For guest cart
export interface GuestCartItem {
  product: Product;
  quantity: number;
  price: number;
  selectedSize?: string; // ✅ ADDED: Size field for guest cart
}

export interface GuestCart {
  items: GuestCartItem[];
  totalPrice: number;
  totalItems: number;
}