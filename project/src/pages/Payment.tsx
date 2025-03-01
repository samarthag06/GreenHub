import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

function Leaderboard() {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      setLocalUser(JSON.parse(userString));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!localUser) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Your Order Has Been Placed!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for making the world a greener place. Your contribution matters!
        </p>
        <button
          onClick={() => navigate('/products')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;