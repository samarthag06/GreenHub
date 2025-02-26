import React from 'react';
import { Package, TrendingUp, Percent, Award } from 'lucide-react';

function ManufacturerDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manufacturer Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">24</p>
          <p className="text-sm text-gray-500 mt-2">Total products</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Sales</h3>
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">$12,450</p>
          <p className="text-sm text-gray-500 mt-2">Total sales</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Green Ratio</h3>
            <Percent className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">75%</p>
          <p className="text-sm text-gray-500 mt-2">Green products ratio</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Avg Green Score</h3>
            <Award className="h-6 w-6 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">8.5</p>
          <p className="text-sm text-gray-500 mt-2">Product average</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Product Performance</h2>
          {/* Product performance chart will be added here */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Green Impact</h2>
          {/* Impact statistics will be added here */}
        </div>
      </div>
    </div>
  );
}

export default ManufacturerDashboard;