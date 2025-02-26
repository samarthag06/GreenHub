import api from './axios';

export const getUserProfile = async () => {
  const { data } = await api.get('/users/profile');
  return data;
};

export const getLeaderboard = async () => {
  const { data } = await api.get('/users/leaderboard');
  return data;
};

export const getNotifications = async (email: string) => {
  console.log("Fetching notifications for:", email);
  
  const { data } = await api.get(`/users/notifications`, {
    params: { email }, // Pass email as query parameter
  });

  return data;
};

export const updateProfile = async (userData: {
  name?: string;
  email?: string;
  password?: string;
}) => {
  const { data } = await api.put('/users/profile', userData);
  return data;
};

export const getmycart = async (email: string) => {
  try {
    const { data } = await api.get('/users/getmycart', {
      params: { email },
    });

    return data.mycart; // Returns full product objects
  } catch (error) {
    console.error('Error fetching mycart:', error);
    throw error;
  }
};

export const addtocart = async (email: string) => {
  console.log("Fetching notifications for:", email);
  
  const { data } = await api.get(`/users/addtocart`, {
    params: { email }, // Pass email as query parameter
  });

  return data;
};

export const removeFromCart = async (email: string, productId: string) => {
  try {
    const { data } = await api.delete(`/users/mycart/${productId}`, {
      data: { email }, // Pass email in request body
    });
    return data; // Return updated cart
  } catch (error) {
    console.error('Error removing product from cart:', error);
    throw error;
  }
};
