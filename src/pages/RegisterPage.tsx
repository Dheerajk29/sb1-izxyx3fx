import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import AuthForm from '../components/auth/AuthForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [error, setError] = useState('');

  const handleRegister = async (email: string, password: string, name: string) => {
    try {
      await register({ email, password, name });
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        error={error}
      />
    </div>
  );
};

export default RegisterPage;