import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState<any>(null);

 

 

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-700">
          About GreenMart
        </h1>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            At GreenMart, our mission is to make sustainable living accessible and rewarding for everyone. We aim to reduce the carbon footprint of everyday shopping by offering eco-friendly products and incentivizing green choices through our unique green credit system.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 mb-6">
            GreenMart operates on a simple yet powerful model to promote sustainability. Here’s a step-by-step breakdown of how our platform works:
          </p>

          {/* Flowchart */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-green-100 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-green-700 mb-4">1</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse Products</h3>
              <p className="text-gray-600">
                Explore our curated selection of eco-friendly products, each with a green score based on its environmental impact.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-blue-100 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-blue-700 mb-4">2</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Make a Purchase</h3>
              <p className="text-gray-600">
                Buy products that align with your values. Every purchase contributes to a greener planet.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-purple-100 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-purple-700 mb-4">3</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Earn Green Credits</h3>
              <p className="text-gray-600">
                Earn green credits for every purchase. The greener the product, the more credits you earn.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-yellow-100 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-yellow-700 mb-4">4</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Redeem Rewards</h3>
              <p className="text-gray-600">
                Use your green credits to unlock exclusive discounts, rewards, and eco-friendly perks.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose GreenMart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Reason 1 */}
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Eco-Friendly Products</h3>
              <p className="text-gray-600">
                We carefully curate products that are sustainable, ethical, and environmentally friendly.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Transparent Green Scores</h3>
              <p className="text-gray-600">
                Every product has a green score, so you know exactly how eco-friendly it is.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Rewarding Sustainability</h3>
              <p className="text-gray-600">
                Earn green credits for every purchase and redeem them for exciting rewards.
              </p>
            </div>
          </div>
        </div>

        {/* Flowchart Explanation */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">The GreenMart Process</h2>
          <p className="text-gray-600 mb-6">
            Here’s a visual representation of how GreenMart works:
          </p>

          {/* Flowchart Diagram */}
          <div className="flex flex-col items-center space-y-6">
            {/* Step 1 */}
            <div className="flex items-center">
              <div className="bg-green-100 p-4 rounded-full">
                <span className="text-2xl font-bold text-green-700">1</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Browse Products</h3>
                <p className="text-gray-600">
                  Explore our eco-friendly product catalog.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="border-l-2 border-dashed border-gray-400 h-8"></div>

            {/* Step 2 */}
            <div className="flex items-center">
              <div className="bg-blue-100 p-4 rounded-full">
                <span className="text-2xl font-bold text-blue-700">2</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Make a Purchase</h3>
                <p className="text-gray-600">
                  Buy products that align with your values.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="border-l-2 border-dashed border-gray-400 h-8"></div>

            {/* Step 3 */}
            <div className="flex items-center">
              <div className="bg-purple-100 p-4 rounded-full">
                <span className="text-2xl font-bold text-purple-700">3</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Earn Green Credits</h3>
                <p className="text-gray-600">
                  Earn credits based on the green Rating .
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="border-l-2 border-dashed border-gray-400 h-8"></div>

            {/* Step 4 */}
            <div className="flex items-center">
              <div className="bg-yellow-100 p-4 rounded-full">
                <span className="text-2xl font-bold text-yellow-700">4</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-800">Redeem Rewards</h3>
                <p className="text-gray-600">
                  Use your credits for discounts and perks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {
          `
          h1 {
            margin-top: 2.5rem;
          }
          `
        }
      </style>
    </div>
  );
}

export default About;