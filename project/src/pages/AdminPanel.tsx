import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Package, Building2, BarChart3 } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Users</h3>
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <Package className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">456</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Manufacturers</h3>
            <Building2 className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">78</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Green Score Avg</h3>
            <BarChart3 className="h-6 w-6 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">8.4</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {/* Activity log will be added here */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Platform Statistics</h2>
          {/* Statistics will be added here */}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-8 gap-4">
        <button 
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={() => navigate('/manufacturer_leaderboard')}
        >
          Manufacturers Leaderboard
        </button>

        <button 
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          onClick={() => navigate('/adminproducts')}
        >
          Products
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
