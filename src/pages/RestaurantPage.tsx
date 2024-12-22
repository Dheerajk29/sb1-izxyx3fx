import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import { restaurants } from '../lib/api';
import useCartStore from '../store/cartStore';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
}

interface Restaurant {
  _id: string;
  name: string;
  description: string;
  image: string;
  menu: MenuItem[];
  rating: number;
  deliveryTime: number;
  priceRange: string;
}

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const { addItem, items, updateQuantity, removeItem } = useCartStore();

  useEffect(() => {
    loadRestaurant();
  }, [id]);

  const loadRestaurant = async () => {
    try {
      const { data } = await restaurants.getById(id!);
      setRestaurant(data);
    } catch (error) {
      console.error('Error loading restaurant:', error);
    }
  };

  const getItemQuantity = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    return item?.quantity || 0;
  };

  const handleAddItem = (item: MenuItem) => {
    addItem({
      id: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurantId: restaurant!._id,
    });
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Restaurant Header */}
      <div className="relative h-64 rounded-lg overflow-hidden mb-8">
        <img
          src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="text-white p-6">
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex gap-4 text-sm">
              <span>★ {restaurant.rating}</span>
              <span>{restaurant.deliveryTime} mins</span>
              <span>{restaurant.priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {restaurant.menu.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm flex gap-4">
            <img
              src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
              alt={item.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-green-600 font-semibold mt-1">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getItemQuantity(item._id) > 0 ? (
                    <>
                      <button
                        onClick={() => removeItem(item._id)}
                        className="p-1 rounded-full bg-green-100 text-green-600"
                      >
                        <Minus size={16} />
                      </button>
                      <span>{getItemQuantity(item._id)}</span>
                      <button
                        onClick={() => handleAddItem(item)}
                        className="p-1 rounded-full bg-green-100 text-green-600"
                      >
                        <Plus size={16} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleAddItem(item)}
                      className="px-4 py-1 rounded-full bg-green-600 text-white text-sm"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantPage;