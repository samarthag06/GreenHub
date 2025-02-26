import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Redirect users if not logged in
import { getProductsraw, approveProduct } from "../api/products"; // Fetch and approve functions

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    // Redirect to login if user is not authenticated
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    // Fetch products
    const fetchProducts = async () => {
      try {
        const data = await getProductsraw();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleApprove = async (productId: string) => {
    try {
      await approveProduct(productId);

      // Update UI: Set ispending = false for approved product
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, ispending: false } : product
        )
      );
    } catch (err) {
      console.error("Error approving product:", err);
      setError("Failed to approve product");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin - Manage Products</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Category</th>
            <th className="py-2 px-4 border">Pending</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border">
              <td className="py-2 px-4 border">{product.name}</td>
              <td className="py-2 px-4 border">${product.price}</td>
              <td className="py-2 px-4 border">{product.category}</td>
              <td className="py-2 px-4 border">
                {product.ispending ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border">
                <button
                  className={`px-4 py-2 rounded text-white ${
                    product.ispending
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400"
                  }`}
                  onClick={() => handleApprove(product._id)}
                  disabled={!product.ispending} // Disable if already approved
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
};

export default AdminProducts;
