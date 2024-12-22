import express from 'express';
import Restaurant from '../models/Restaurant.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { cuisine, isVeg, search } = req.query;
    let query = {};

    if (cuisine) query['cuisine'] = cuisine;
    if (isVeg) query['menu.isVeg'] = isVeg === 'true';
    if (search) {
      query['$or'] = [
        { name: { $regex: search, $options: 'i' } },
        { 'menu.name': { $regex: search, $options: 'i' } }
      ];
    }

    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;