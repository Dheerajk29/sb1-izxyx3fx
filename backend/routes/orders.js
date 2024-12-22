import express from 'express';
import Order from '../models/Order.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      user: req.user.id
    });
    await order.save();
    
    req.app.get('io').to(`order_${order._id}`).emit('orderStatus', {
      orderId: order._id,
      status: order.status
    });
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('restaurant', 'name')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('restaurant');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    req.app.get('io').to(`order_${order._id}`).emit('orderStatus', {
      orderId: order._id,
      status: order.status
    });
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;