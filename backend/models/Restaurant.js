import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true },
  isVeg: { type: Boolean, required: true },
  isAvailable: { type: Boolean, default: true }
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  cuisine: [{ type: String }],
  rating: { type: Number, default: 0 },
  deliveryTime: { type: Number, required: true }, // in minutes
  priceRange: { type: String, required: true }, // $, $$, $$$
  menu: [menuItemSchema],
  isOpen: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Restaurant', restaurantSchema);