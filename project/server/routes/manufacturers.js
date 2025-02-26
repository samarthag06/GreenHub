import express from 'express';
import Manufacturer from '../models/Manufacturer.js';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get manufacturer stats
router.get('/stats', auth, async (req, res) => {
  try {
    if (req.user.role !== 'manufacturer') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const manufacturer = await Manufacturer.findById(req.user.userId)
      .populate('products');

    const stats = {
      totalProducts: manufacturer.products.length,
      greenRatio: manufacturer.greenRatio,
      totalProductsSold: manufacturer.totalProductsSold,
      greenProductsSold: manufacturer.greenProductsSold
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get manufacturer products
router.get('/products', auth, async (req, res) => {
  try {
    if (req.user.role !== 'manufacturer') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const manufacturer = await Manufacturer.findById(req.user.userId)
      .populate('products');

    res.json(manufacturer.products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/all', auth, async (req, res) => {
  try {
    const manufacturers = await User.find({ role: 'manufacturer' });

    if (!manufacturers.length) {
      return res.status(404).json({ message: 'No manufacturers found' });
    }

    res.json(manufacturers);
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Update manufacturer profile
router.put('/profile', auth, async (req, res) => {
  try {
    if (req.user.role !== 'manufacturer') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const manufacturer = await Manufacturer.findByIdAndUpdate(
      req.user.userId,
      req.body,
      { new: true }
    ).select('-password');

    res.json(manufacturer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;