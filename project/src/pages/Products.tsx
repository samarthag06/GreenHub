import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { getProductsraw, addToCart } from '../api/products'; // Import the addToCart function

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

function Products() {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      setLocalUser(JSON.parse(userString));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Use the getProductsraw function to fetch products
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProductsraw,
    enabled: !!localUser,
  });

  // Mutation to handle adding a product to the cart
  const addToCartMutation = useMutation({
    mutationFn: (productId: string) => addToCart(productId, localUser?.email),
    onSuccess: () => {
      alert('Product added to cart successfully!');
    },
    onError: (error) => {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    },
  });

  // ✅ Corrected filtering logic
  const filteredProducts = products ? products.filter(product => product.ispending === false) : [];

  console.log("Filtered products:", filteredProducts); // ✅ Debug filtered products

  if (!localUser) {
    return null;
  }

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
          Unable to load products. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sustainable Products</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {product.images[0] && (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    Score: {product.greenScore}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => addToCartMutation.mutate(product._id)}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => navigate(`/buy/${product._id}`)} // Redirect to the buy page
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
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
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No products available at the moment.</p>
        </div>
      )}
    </div>
  );
}

export default Products;