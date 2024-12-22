import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-green-600">
                FoodDelivery
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/cart" className="relative">
                    <ShoppingBag className="h-6 w-6 text-gray-600" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                  <Link to="/profile">
                    <User className="h-6 w-6 text-gray-600" />
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;