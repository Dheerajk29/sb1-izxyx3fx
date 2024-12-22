import React, { useEffect, useState } from 'react';
import { orders } from '../lib/api';
import useAuthStore from '../store/authStore';
import OrderList from '../components/orders/OrderList';
import ProfileInfo from '../components/profile/ProfileInfo';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data } = await orders.getAll();
      setUserOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ProfileInfo user={user} />
        </div>
        <div className="md:col-span-2">
          <OrderList orders={userOrders} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;