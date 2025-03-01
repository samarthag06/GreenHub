import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Loader2, Star } from 'lucide-react';
import { fetchProductDetails, addToCart, addToPurchaseHistory } from '../api/products';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  manufacturer: string;
  carbonContent: number;
  greenScore: number;
  category: string;
  images: string[];
  stock: number;
  ispending: boolean;
}

function BuyNow() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState<any>(null); // State for user

  // Set user from localStorage
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      setUser(JSON.parse(userString));
    }else{

      navigate('/login');
    }
    
  }, []);

 

  // Fetch product details
  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => fetchProductDetails(productId!),
  });

  // Mutation for adding to cart
  const addToCartMutation = useMutation({
    mutationFn: (productId: string) => addToCart(productId, user?.email || ''),
    onSuccess: () => {
      alert('Product added to cart successfully!');
    },
    onError: (error) => {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    },
  });

  // Mutation for adding to purchase history
  const addToPurchaseHistoryMutation = useMutation({
    mutationFn: ({ productId, userId }: { productId: string; userId: string }) =>
      addToPurchaseHistory(productId, userId),
    onSuccess: () => {
      navigate(`/payment/${productId}`); // Navigate to payment page after success
    },
    onError: (error) => {
      console.error('Error adding product to purchase history:', error);
      alert('Failed to proceed to payment. Please try again.');
    },
  });

  const handleProceedToPayment = () => {
    if (productId && user) {
      addToPurchaseHistoryMutation.mutate({ productId, userId: user.id });
    } else {
      alert('User or product ID is missing. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to fetch product details. Please try again.
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          Product not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Buy Now</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="space-y-2">
              <p className="text-lg font-semibold">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">Manufacturer: {product.manufacturer}</p>
              <p className="text-sm text-gray-600">Carbon Content: {product.carbonContent} kg</p>
              <p className="text-sm text-gray-600">Green Score: {product.greenScore}</p>
              <p className="text-sm text-gray-600">Category: {product.category}</p>
              <p className="text-sm text-gray-600">Stock: {product.stock}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2 mt-6">
              <button
                onClick={() => addToCartMutation.mutate(product._id)}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {/* Review Form (Static, No Functionality) */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Review functionality is not implemented yet.');
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`h-6 w-6 ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    <Star className="w-full h-full" />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={4}
                placeholder="Share your thoughts about the product..."
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Display Reviews (Static, No Functionality) */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= 5 ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">October 10, 2023</span>
            </div>
            <p className="text-gray-700">
              This product is amazing! It's eco-friendly and works perfectly.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= 4 ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">October 5, 2023</span>
            </div>
            <p className="text-gray-700">
              Great quality and very sustainable. Highly recommend!
            </p>
          </div>
        </div>
      </div>
      <style>
        {
            `
            h1{
            margin-top: 2.5rem;
            }
            `
        }
      </style>
    </div>
  );
}

export default BuyNow;