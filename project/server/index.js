import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import manufacturerRoutes from './routes/manufacturers.js';
import userRoutes from './routes/users.js';
import communityRoutes from './routes/community.js';
import moragan from 'morgan'

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(moragan('dev'))

// Database connection with better error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(`connection established with host ${mongoose.connection.host}`);
})
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
  console.log('Please ensure:');
  console.log('1. Your IP is whitelisted in MongoDB Atlas');
  console.log('2. Username and password are correct');
  console.log('3. Database name is correct');
  process.exit(1); // Exit if we can't connect to the database
});

// Log MongoDB events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/manufacturers', manufacturerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/community', communityRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../dist')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
} else {
  // Development - redirect root to API message
  app.get('/', (req, res) => {
    res.json({ message: 'Green E-commerce API is running' });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});