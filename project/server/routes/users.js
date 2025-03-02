import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import Product from '../models/Product.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('purchaseHistory')
      .populate('posts');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      req.body,
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .sort({ greenCredits: -1 })
      .limit(50)
      .select('name greenCredits purchaseHistory');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/notifications', async (req, res) => {
  try {
    const email = req.query.email; // Extract email from query params

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const dbuser = await User.findOne({ email });

    if (!dbuser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(dbuser.notification); // Return the notifications array
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error finding notifications' });
  }
});

router.get('/getmycart', async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const dbuser = await User.findOne({ email });

    if (!dbuser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract product IDs from mycart
    const productIds = dbuser.mycart.map((item) => item.productId);

    // Fetch full product details
    const products = await Product.find({ _id: { $in: productIds } });

    res.json({ mycart: products });
  } catch (error) {
    console.error('Error fetching mycart:', error);
    res.status(500).json({ message: 'Server error fetching mycart' });
  }
});


router.delete('/mycart/:productId', async (req, res) => {
  try {
    const { email } = req.body; // Email from request body
    const { productId } = req.params; // Product ID from URL

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter out the product from mycart
    user.mycart = user.mycart.filter((item) => item.productId !== productId);

    await user.save(); // Save updated cart

    res.json({ message: 'Product removed from cart', mycart: user.mycart });
  } catch (error) {
    console.error('Error removing product from mycart:', error);
    res.status(500).json({ message: 'Server error removing product from mycart' });
  }
});


router.get('/count_users', async (req, res) => {
  try {
    
console.log("he")
    const count = await User.countDocuments(); // Assuming you're using Mongoose
    res.json({ count });


  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;