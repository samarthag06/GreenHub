import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { getmycart, removeFromCart } from '../api/users'; // Import API functions

// Updated CartProduct interface
interface CartProduct {
  _id: string;
  name: string;
  manufacturer: string;
  greenScore: number;
  price: number;
  images: string[];
}

function Mycart() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setLocalUser(user);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch mycart data using React Query
  const { data: mycart, isLoading } = useQuery<CartProduct[]>({
    queryKey: ['mycart'],
    queryFn: () => getmycart(localUser?.email),
    enabled: !!localUser,
  });

  // Mutation to remove product from mycart
  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      await removeFromCart(localUser?.email, productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mycart'] });
    },
  });

  const handleDelete = (productId: string) => {
    deleteProductMutation.mutate(productId);
  };

  if (!localUser) return null;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>
      {mycart?.length === 0 ? (
        <div className="text-center text-gray-500">No products in your cart.</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            {mycart?.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                {/* Wrap product details in a Link */}
                <Link
                  to={`/buy/${product._id}`}
                  className="flex items-center space-x-4 flex-1" // flex-1 to make the entire area clickable
                >
                  <img src={product.images?.[0]} alt={product.name} className="h-16 w-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">Manufacturer: {product.manufacturer}</p>
                    <p className="text-sm text-gray-500">Green Score: {product.greenScore}</p>
                    <p className="text-sm text-gray-500">Price: ${product.price}</p>
                  </div>
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <style>
        {
            `
            h1{
            margin-top: 3rem;
            }
            `
        }
      </style>
    </div>
  );
}

export default Mycart;