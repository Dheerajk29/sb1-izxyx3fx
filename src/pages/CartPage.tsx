import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import useCartStore from '../store/cartStore';
import { orders } from '../lib/api';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore();
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: items.map(item => ({
          menuItem: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        restaurantId: items[0]?.restaurantId,
        totalAmount: total,
        deliveryAddress: address,
        paymentMethod,
      };

      const { data } = await orders.create(orderData);
      clearCart();
      navigate(`/orders/${data._id}`);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some delicious items to your cart</p>
        <button
          onClick={() => navigate('/')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Your Cart</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm mb-4 flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-green-600">₹{item.price}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="p-1 rounded-full bg-green-100 text-green-600"
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-green-100 text-green-600"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 rounded-full bg-red-100 text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          
          <div className="mb-6">
            <p className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>₹40</span>
            </p>
            <div className="border-t pt-2 mt-2">
              <p className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{total + 40}</span>
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Delivery Address</h4>
            <input
              type="text"
              placeholder="Street"
              className="w-full mb-2 p-2 border rounded"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="City"
                className="p-2 border rounded"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="State"
                className="p-2 border rounded"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
              />
            </div>
            <input
              type="text"
              placeholder="ZIP Code"
              className="w-full mt-2 p-2 border rounded"
              value={address.zipCode}
              onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Payment Method</h4>
            <select
              className="w-full p-2 border rounded"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="card">Card Payment</option>
              <option value="upi">UPI</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;