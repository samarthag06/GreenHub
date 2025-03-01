import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';
import User from '../models/User.js'
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('manufacturer', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all products (without populating manufacturer details)
router.get('/raw', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products as-is
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put("/:productId/approve", async (req, res) => {
  try {
    const { productId } = req.params;

    // Find and update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { ispending: false }, // Set ispending to false
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product approved", product: updatedProduct });
  } catch (error) {
    console.error("Error approving product:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('manufacturer', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/buy/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('manufacturer', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product (manufacturer only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'manufacturer') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const product = new Product({
      ...req.body,
      manufacturer: req.user.userId
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.manufacturer.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/request_new_product", async (req, res) => {
  try {
   

    const { name, description, price, manufacturer, carbonContent, category, images, stock } = req.body;

    // Find the manufacturer to get their name
    const manufacturerUser = await User.findById(manufacturer);
    if (!manufacturerUser) {
      return res.status(404).json({ message: "Manufacturer not found" });
    }

    const greenScore = carbonContent / 4;

    // Create the new product
    const newProduct = new Product({
      name,
      description,
      price,
      manufacturer,
      carbonContent,
      greenScore,
      category,
      images,
      stock,
      ispending: true, // Set pending to true by default
      updatedAt: new Date(),
    });

    const savedProduct = await newProduct.save();

    // Find the admin user
    const adminUser = await User.findOne({ isadmin: true });
    if (adminUser) {

      const notificationMessage = `New product "${name}" from ${manufacturerUser.name} is waiting for approval.`;

      adminUser.notification.push(notificationMessage); // Push as a string
  await adminUser.save(); // Save the updated admin user with the new notification
    }

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error. Could not add product." });
  }
});

router.post('/addtocart', async (req, res) => {
  try {
    const { productId, email } = req.body;

    // Validate input
    if (!productId || !email) {
      return res.status(400).json({ message: 'Product ID and email are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the product to the user's mycart array
    user.mycart.push({ productId }); // You can add more fields if needed
    await user.save();

    res.json({ message: 'Product added to cart successfully', mycart: user.mycart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Server error adding product to cart' });
  }
});

export default router;