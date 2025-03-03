import express from 'express';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';
import User from '../models/User.js'
import Manufacturer from '../models/Manufacturer.js';

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
   

    const { name, description, price, manufacturer, carbonFootprint, category, images, stock , packagingType,certification,endOfLifeDisposal} = req.body;
console.log(name, description, price, manufacturer, carbonFootprint, category, images, stock , packagingType,certification,endOfLifeDisposal);
    // Find the manufacturer to get their name


   
    let carbonScore=0;

    if((40 - (carbonFootprint * 0.4)) >0){
      carbonScore = (40 - (carbonFootprint * 0.4));
    }

    let packagingScore = 0;
    if (packagingType === "Biodegradable") {
        packagingScore = 20;
    } else {
        packagingScore = 5; // Non-biodegradable packaging has a penalty
    }


    let certScore = 0;
    if(certification==="None"){
      certScore=0;
    }else {
      certScore = 20;
    }

       // **4. End-of-Life Disposal Contribution (20%)**
       let disposalScore = 0;
       if (endOfLifeDisposal === "Recyclable/Compostable") {
           disposalScore = 20;
       } else if (endOfLifeDisposal === "Partially Recyclable") {
           disposalScore = 10;
       } else {
           disposalScore = 5;  // Non-recyclable gets the lowest score
       }




    console.log("hello")
    const manufacturerUser = await User.findById(manufacturer);
    if (!manufacturerUser) {
      return res.status(404).json({ message: "Manufacturer not found" });
    }

   let greenScore = carbonScore + packagingScore + certScore + disposalScore; // just change this greenScore logic formula.


const carbonContent = carbonFootprint;
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

    console.log("grenscore is" ,greenScore);

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
    console.log("here in add to cart");
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
// router.post('/purchase', async (req, res) => {
//   try {
//     const { productId, userId } = req.body;
    

//     // Validate input
//     if (!productId || !userId) {
//       return res.status(400).json({ message: 'Product ID and user ID are required' });
//     }

//     // Find the user by ID
//     const user = await User.findById(userId);

    
//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Find the product by ID
//     const product = await Product.findById(productId);

    
//     // Check if product exists
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Add the product to the user's purchaseHistory array
//     user.purchaseHistory.push(product); // You can add more fields if needed
//     await user.save();

//     res.json({ message: 'Product added to purchase history successfully', purchaseHistory: user.purchaseHistory });
//   } catch (error) {
//     console.error('Error adding product to purchase history:', error);
//     res.status(500).json({ message: 'Server error adding product to purchase history' });
//   }
// });

router.post('/purchase', async (req, res) => {
  try {
    
    const { productId, userId } = req.body;

    // Validate input
    if (!productId || !userId) {
      return res.status(400).json({ message: 'Product ID and user ID are required' });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add the product to the user's purchaseHistory array
    user.purchaseHistory.push(product); // You can add more fields if needed
    user.greenCredits += product.greenScore;
    await user.save();

    // Find the manufacturer by ID from the product
    const manufacturer = await User.findById(product.manufacturer);

    // Check if manufacturer exists
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    // Increment the total_products_sold field
    manufacturer.total_products_sold += 1;
    if(product.greenScore>=65){
      manufacturer.green_products_sold += 1;
    }
    await manufacturer.save();

    res.json({
      message: 'Product added to purchase history successfully',
      purchaseHistory: user.purchaseHistory,
      total_products_sold: manufacturer.total_products_sold, // Optional: Return updated total_products_sold
    });
  } catch (error) {
    console.error('Error adding product to purchase history:', error);
    res.status(500).json({ message: 'Server error adding product to purchase history' });
  }
});

router.get("/countusers", async (req, res) => {
  try {
    
console.log("he_in product.js");
    const count = await User.countDocuments(); // Assuming you're using Mongoose
    res.json({ count });


  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



router.get('/count_products', async (req, res) => {
  try {
    console.log("count_products")
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching product count:', error);
    res.status(500).json({ error: 'Failed to fetch product count' });
  }
});


router.get('/count_users', async (req, res) => {
  try {
    console.log("count_users")
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching product count:', error);
    res.status(500).json({ error: 'Failed to fetch product count' });
  }
});




export default router;