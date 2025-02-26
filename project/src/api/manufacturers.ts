import api from './axios';

export const getManufacturerStats = async () => {
  const { data } = await api.get('/manufacturers/stats');
  return data;
};

export const getManufacturerProducts = async () => {
  const { data } = await api.get('/manufacturers/products');
  return data;
};

export const updateProduct = async (id: string, productData: FormData) => {
  const { data } = await api.put(`/manufacturers/products/${id}`, productData);
  return data;
};

export const getManufacturer = async () => {
  const { data } = await api.get('/manufacturers/all');
  return data;
};
