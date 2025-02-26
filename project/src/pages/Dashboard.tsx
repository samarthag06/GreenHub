import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Award, CreditCard } from "lucide-react";
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
      navigate("/login"); // ✅ Redirect to login if no user is found
    }
  }, [navigate]);

  // ✅ Prevent API call if no user is found in localStorage
  const { data: user, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: !!localUser, // ✅ Only fetch user profile if user exists
  });

  if (!localUser) {
    return null; // ✅ Prevent rendering before redirect
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
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

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Savings</h3>
            <CreditCard className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">$45</p>
          <p className="text-sm text-gray-500 mt-2">Total savings</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          {user?.purchaseHistory?.length > 0 ? (
            <div className="space-y-4">
              {/* Map through purchase history */}
            </div>
          ) : (
            <p className="text-gray-500">No orders yet</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Green Impact</h2>
          {/* Impact statistics will be added here */}
        </div>
      </div>
      <style>
          {

            `
            h1{
            margin-top: 3.4rem;
            }`
          }


      </style>
    </div>
  );
}

export default Dashboard;
