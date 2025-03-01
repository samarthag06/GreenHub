import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Leaf, Award, Users, Star, ChevronRight } from 'lucide-react';
import { getProductsraw } from '../api/products'; // Import the function
import './home.css';

// Define the Product interface
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  // Add other fields as needed
}

function Home() {
  const navigate = useNavigate();

  // Fetch all products using React Query
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProductsraw,
  });

  // Get the top 4 products
  const topProducts = products?.slice(0, 4);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Failed to load products. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Shop Sustainably, Earn Green Credits
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join our community of eco-conscious shoppers and make a positive impact on the environment.
        </p>
        <button
          onClick={() => navigate(`/products`)}
          className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center mx-auto"
        >
          Start Shopping <ChevronRight className="ml-2" />
        </button>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-green-500 mb-4">
            <Leaf size={40} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Green Score System</h3>
          <p className="text-gray-600">
            Every product has a green score based on its carbon footprint. Higher scores mean better environmental impact.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-500 mb-4">
            <Award size={40} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
          <p className="text-gray-600">
            Get green credits for buying eco-friendly products and sharing your sustainable shopping journey.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-purple-500 mb-4">
            <Users size={40} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
          <p className="text-gray-600">
            Connect with like-minded shoppers and share your sustainable shopping experiences.
          </p>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-green-50 p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Green Products</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {topProducts?.map((product: Product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md text-center">
              <img
                src={product.images[0]} // Use the first image from the product
                alt={product.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <button
                onClick={() => navigate(`/buy/${product._id}`)} // Navigate to product details
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
            </div>
            <p className="text-gray-600 mb-4">
              "I love how easy it is to find eco-friendly products here. The green credits are a great bonus!"
            </p>
            <p className="text-sm font-semibold">— Samarth A.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
            </div>
            <p className="text-gray-600 mb-4">
              "The community is amazing! I’ve learned so much about sustainable living."
            </p>
            <p className="text-sm font-semibold">— Deepak</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
              <Star className="text-yellow-500 mr-2" />
            </div>
            <p className="text-gray-600 mb-4">
              "Great selection of products and the rewards system is fantastic!"
            </p>
            <p className="text-sm font-semibold">— Neelu </p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-green-600 text-white p-8 rounded-lg mb-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-xl mb-6">
          Join thousands of eco-conscious shoppers and start earning green credits today.
        </p>
        <button
          onClick={() => navigate(`/register`)}
          className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
        >
          Sign Up Now
        </button>
      </div>

      {/* Footer Section */}
      <div className="text-center py-8 border-t border-gray-200">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="/about" className="text-gray-600 hover:text-green-600">
            About Us
          </a>
          <a href="/contact" className="text-gray-600 hover:text-green-600">
            Contact
          </a>
          <a href="/faq" className="text-gray-600 hover:text-green-600">
            FAQ
          </a>
        </div>
        <p className="text-gray-600">
          &copy; 2025 GreenMart. All rights reserved.
        </p>
      </div>
      <style>
        {
          `
          h1{
          margin-top: 3.5rem;
          }
          `
        }
      </style>
    </div>
  );
}

export default Home;