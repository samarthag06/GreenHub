import React from 'react';
import { Leaf, Award, Users } from 'lucide-react';
import './home.css'

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Shop Sustainably, Earn Green Credits
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join our community of eco-conscious shoppers and make a positive impact on the environment
        </p>
      </div>

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

      <div className="bg-green-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Green Products</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {/* Product cards will be dynamically loaded here */}
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

export default Home;