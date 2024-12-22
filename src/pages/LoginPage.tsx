import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import AuthForm from '../components/auth/AuthForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        error={error}
      />
    </div>
  );
};

export default LoginPage;