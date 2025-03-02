import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct_request } from "../api/products"; // Import API function

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    carbonFootprint: "",
    packagingType: "Biodegradable", // Packaging type field
    certification: "None", // Certifications field
    endOfLifeDisposal: "Non Recyclable", // New field for end-of-life disposal
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        carbonFootprint: parseFloat(formData.carbonFootprint),
        images: [formData.image], // Convert single image URL to array
        manufacturer: localStorage.getItem("userId"), // Assuming userId is stored in localStorage
      };

      console.log(productData);
      await createProduct_request(productData);
      setSuccess(true);
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: "",
        carbonFootprint: "",
        packagingType: "Biodegradable", // Reset to default value
        certification: "None", // Reset to default value
        endOfLifeDisposal: "Non Recyclable", // Reset to default value
      });

      setTimeout(() => navigate("/products"), 2000); // Redirect after success
    } catch (error) {
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Product submitted for approval!</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Carbon Footprint</label>
            <input
              type="number"
              name="carbonFootprint"
              value={formData.carbonFootprint}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Packaging Type</label>
            <select
              name="packagingType"
              value={formData.packagingType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="Biodegradable">Biodegradable</option>
              <option value="Non-Biodegradable">Non-Biodegradable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Certifications</label>
            <select
              name="certification"
              value={formData.certification}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="None">None</option>
              <option value="ECOLOGO">ECOLOGO</option>
              <option value="CRI Green Label">CRI Green Label</option>
              <option value="Carbon Trust Certification">Carbon Trust Certification</option>
              <option value="Blue Angel">Blue Angel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">End-of-Life Disposal</label>
            <select
              name="endOfLifeDisposal"
              value={formData.endOfLifeDisposal}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="Non Recyclable">Non Recyclable</option>
              <option value="Partially Recyclable">Partially Recyclable</option>
              <option value="Recyclable/Compostable">Recyclable/Compostable</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={4}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-1">Product Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;