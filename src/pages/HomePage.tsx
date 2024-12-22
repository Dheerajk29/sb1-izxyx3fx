import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { restaurants } from '../lib/api';

interface Restaurant {
  _id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string[];
  rating: number;
  deliveryTime: number;
  priceRange: string;
}

const HomePage = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    isVeg: false,
    cuisine: '',
  });

  useEffect(() => {
    loadRestaurants();
  }, [searchQuery, filters]);

  const loadRestaurants = async () => {
    try {
      const { data } = await restaurants.getAll({
        search: searchQuery,
        ...filters,
      });
      setFeaturedRestaurants(data);
    } catch (error) {
      console.error('Error loading restaurants:', error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-green-600 to-green-400">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Delicious food delivered to your doorstep</h1>
            <p className="text-xl mb-8">Order from your favorite restaurants</p>
            
            {/* Search Bar */}
            <div className="flex gap-4 max-w-2xl">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for restaurants or dishes..."
                  className="w-full px-4 py-3 rounded-lg text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-3 text-gray-400" />
              </div>
              <button
                onClick={() => setFilters({ ...filters, isVeg: !filters.isVeg })}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  filters.isVeg ? 'bg-green-500' : 'bg-white text-gray-900'
                }`}
              >
                <Filter size={20} />
                Veg Only
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRestaurants.map((restaurant) => (
            <Link
              key={restaurant._id}
              to={`/restaurant/${restaurant._id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={restaurant.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {restaurant.rating} ★
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{restaurant.cuisine.join(', ')}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{restaurant.deliveryTime} mins</span>
                  <span>{restaurant.priceRange}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;