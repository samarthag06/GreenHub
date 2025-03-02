import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Bell } from 'lucide-react';
import { getNotifications } from '../api/users';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      setLocalUser(JSON.parse(userString));
    } else {
      navigate('/login'); // Redirect to login if no user is found
    }
  }, [navigate]);

  const { data: notifications, isLoading, error } = useQuery({
    queryKey: ['notifications', localUser?.email],
    queryFn: () => getNotifications(localUser?.email || ''),
    enabled: !!localUser?.email, // Prevents API call if user is not logged in
  });

  // Reverse the notifications array to show latest first
  const reversedNotifications = notifications ? [...notifications].reverse() : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Bell className="h-6 w-6 text-green-600 mr-2" /> Recent Notifications
        </h2>
        {isLoading ? (
          <p className="text-gray-500">Loading notifications...</p>
        ) : error ? (
          <p className="text-red-500">Failed to fetch notifications.</p>
        ) : reversedNotifications.length > 0 ? (
          <ul className="space-y-4">
            {reversedNotifications.map((notif: string, index: number) => (
              <li key={index} className="p-4 bg-gray-100 rounded-lg shadow">
                {notif}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No new notifications.</p>
        )}
      </div>
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

export default Notifications;