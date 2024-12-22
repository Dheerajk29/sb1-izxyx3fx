import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AdminRoute = () => {
  const { user, isAuthenticated } = useAuthStore();
  return isAuthenticated && user?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;