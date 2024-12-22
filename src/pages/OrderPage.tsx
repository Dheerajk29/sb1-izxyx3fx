import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orders } from '../lib/api';
import { io } from 'socket.io-client';

interface Order {
  _id: string;
  status: string;
  items: Array<{
    menuItem: {
      name: string;
      price: number;
    };
    quantity: number;
  }>;
  totalAmount: number;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  restaurant: {
    name: string;
  };
  createdAt: string;
}

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrder();
    
    const socket = io('http://localhost:5000');
    socket.emit('join_order_room', id);
    
    socket.on('orderStatus', (data) => {
      if (data.orderId === id) {
        loadOrder();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const loadOrder = async () => {
    try {
      const { data } = await orders.getById(id!);
      setOrder(data);
    } catch (error) {
      console.error('Error loading order:', error);
    }
  };

  if (!order) return <div>Loading...</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-purple-100 text-purple-800';
      case 'out_for_delivery':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Order #{order._id.slice(-6)}</h2>
            <p className="text-gray-600">{order.restaurant.name}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
            {order.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="border-t border-b py-4 mb-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>
                {item.quantity}x {item.menuItem.name}
              </span>
              <span>₹{item.menuItem.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Delivery Address</h3>
          <p className="text-gray-600">
            {order.deliveryAddress.street}<br />
            {order.deliveryAddress.city}, {order.deliveryAddress.state}<br />
            {order.deliveryAddress.zipCode}
          </p>
        </div>

        <div className="flex justify-between font-semibold">
          <span>Total Amount</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;