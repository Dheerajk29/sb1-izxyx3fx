export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phoneNumber?: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string[];
  rating: number;
  deliveryTime: number;
  priceRange: string;
  menu: MenuItem[];
}

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
}

export interface Order {
  _id: string;
  user: string;
  restaurant: {
    _id: string;
    name: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: string;
}

export interface OrderItem {
  menuItem: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
export type PaymentMethod = 'card' | 'upi' | 'wallet';