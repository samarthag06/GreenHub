import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.delete('/posts/:postId', async (req, res) => {
  try {
    
    const { postId } = req.params; // Extract postId from the URL

   
    // Find the user who created the post
    const user = await User.findOne({ 'posts._id': postId });

    // If the user or post doesn't exist, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Find the post in the user's posts array
    const postIndex = user.posts.findIndex(post => post._id.toString() === postId);

    // If the post doesn't exist, return a 404 error
    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Remove the post from the user's posts array
    const deletedPost = user.posts.splice(postIndex, 1)[0];

    // Save the updated user document
    await user.save();

    // Return a success response
    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await User.aggregate([
      { $unwind: '$posts' },
      { $sort: { 'posts.createdAt': -1 } },
      { $limit: 50 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: '$posts._id',
          content: '$posts.content',
          image: '$posts.image',
          productId: '$posts.productId',
          greenCredits: '$posts.greenCredits',
          createdAt: '$posts.createdAt',
          user: {
            _id: '$user._id',
            name: '$user.name'
          }
        }
      }
    ]);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create post
router.post('/posts', auth, async (req, res) => {
  try {
    
      const { content, name, email, role } = req.body;

     
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const post = {
      content: content,
      createdbyname: user.name,
      createdbyemail: user.email,
      // image: req.body.image,
      // productId: req.body.productId,
      greenCredits:  1, // More credits for product-related posts
      createdAt: new Date()
    };

   
    user.posts.push(post);
   
    user.greenCredits += post.greenCredits;
    await user.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;