import api from './axios';

export const getProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const getProductsraw = async () => {
  const { data } = await api.get('/products/raw');
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (productData: FormData) => {
  const { data } = await api.post('/products', productData);
  return data;
};

export const approveProduct = async (productId: string) => {
  const { data } = await api.put(`/products/${productId}/approve`);
  return data;
};
export const createProduct_request = async (productData: any) => {
  try {
    const manufacturerId = localStorage.getItem('user'); // Get manufacturer ID from localStorage
    if (!manufacturerId) {
      throw new Error("Manufacturer ID not found in local storage.");
    }

    const manufacturer = JSON.parse(manufacturerId);

    const updatedProductData = {
      ...productData,
      manufacturer: manufacturer.id, // Add manufacturer ID
    };

    console.log("Submitting product data:", updatedProductData);

    const { data } = await api.post("/products/request_new_product", updatedProductData);
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Function to add a product to the user's cart
export const addToCart = async (productId: string, email: string) => {
  try {
    const {data} = await api.post('/products/addtocart', {
      productId,
      email,
    });
    return data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};

export const fetchProductDetails = async (id: string) => {
  console.log(id);
  const { data } = await api.get(`/products/buy/${id}`);
  return data;
};



export const addToPurchaseHistory = async (productId: string, userId: string) => {
  try {
    
    const {data} = await api.post('/products/purchase', {
      productId,
      userId,
    });
    return data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
};




export const submitReview = async (id: string) => {

};

export const fetchReviews = async (id: string) => {

};