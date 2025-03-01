import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Award, Gift } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/users";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setLocalUser(JSON.parse(userString));
    } else {
      navigate("/login"); // Redirect to login if no user is found
    }
  }, [navigate]);

  // Prevent API call if no user is found in localStorage
  const { data: user, isLoading, refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: !!localUser, // Only fetch user profile if user exists
  });

  // Refetch data when the component mounts
  useEffect(() => {
    if (localUser) {
      refetch();
    }
  }, [localUser, refetch]);

  if (!localUser) {
    return null; // Prevent rendering before redirect
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Get the latest 4 products from purchaseHistory
  const latestProducts = user?.purchaseHistory?.slice(-4).reverse() || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Green Credits</h3>
            <Award className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            {user?.greenCredits || 0}
          </p>
          <p className="text-sm text-gray-500 mt-2">Current balance</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Orders</h3>
            <ShoppingBag className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {user?.purchaseHistory?.length || 0}
          </p>
          <p className="text-sm text-gray-500 mt-2">Total orders</p>
        </div>
      </div>

      {/* Your Rewards Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Rewards</h2>
        <div className="grid md:grid-cols-1 gap-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">50% Off Discount Coupon</h3>
              <Gift className="h-6 w-6" />
            </div>
            <p className="text-sm mb-4">
              Use this coupon to get 50% off on your next purchase.
            </p>
            <button
              onClick={() => {}} // Do nothing on click
              className="bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-purple-100 transition-colors"
            >
              Redeem
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {latestProducts.length > 0 ? (
          <div className="space-y-4">
            {latestProducts.map((product: any) => (
              <div key={product._id} className="flex items-center space-x-4 border-b pb-4">
                <img
                  src={product.images[0]} // Use the first image from the product
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No orders yet</p>
        )}
      </div>

      <style>
        {
          `
          h1 {
            margin-top: 3.4rem;
          }
          `
        }
      </style>
    </div>
  );
}

export default Dashboard;