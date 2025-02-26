import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard } from '../api/users';
import { Trophy, Award } from 'lucide-react';

const trophyColors = [
  'text-yellow-500',  // 1st place
  'text-gray-400',    // 2nd place
  'text-orange-500',  // 3rd place
  'text-blue-500',    // 4th place
  'text-green-500',   // 5th place
  'text-red-500',     // 6th place
  'text-purple-500',  // 7th place
  'text-pink-500',    // 8th place
  'text-indigo-500',  // 9th place
  'text-teal-500'     // 10th place and beyond
];

function Leaderboard() {
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

  const { data: leaders, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    enabled: !!localUser,
  });

  if (!localUser) return null;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Green Leaders</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {leaders?.map((user: any, index: number) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Trophy className={`h-6 w-6 ${trophyColors[index] || 'text-teal-500'}`} />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">
                    Total Orders: {user.purchaseHistory.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-green-600" />
                <span className="font-bold">{user.greenCredits}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`h1 { margin-top: 3.4rem; }`}</style>
    </div>
  );
}

export default Leaderboard;
