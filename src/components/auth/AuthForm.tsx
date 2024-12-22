import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (email: string, password: string, name?: string) => void;
  error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit(formData.email, formData.password, formData.name);
    } else {
      onSubmit(formData.email, formData.password);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === 'login' ? 'Login' : 'Create Account'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-colors"
        >
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {type === 'login' ? (
          <>
            Don't have an account?{' '}
            <Link to="/register" className="text-green-600 hover:underline">
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default AuthForm;