import api from './axios';

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};