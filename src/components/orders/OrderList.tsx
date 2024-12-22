import React from 'react';
import { Link } from 'react-router-dom';

interface OrderItem {
  _id: string;
  restaurant: {
    name: string;
  };
  status: string;
  totalAmount: number;
  createdAt: string;
}

interface OrderListProps {
  orders: OrderItem[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="block bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{order.restaurant.name}</h3>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                {order.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <p className="text-green-600 font-semibold">₹{order.totalAmount}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrderList;