import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditClothing() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        const product = response.data;
        
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategory(product.category);
        setCurrentImage(product.image);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setMessage("Failed to load product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (description.length > 100) {
      setMessage("Description must be less than 100 characters");
      return;
    }

    const formData = new FormData();
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      navigate(`/product/${id}`);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      } else {
        setMessage("Error updating product");
      }
    }
  };

  if (loading) return <div className="pt-20 text-center">Loading product details...</div>;

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="mb-4 self-start px-4">
        <Link to={`/product/${id}`} className="text-blue-500 hover:underline">← Back to Product</Link>
      </div>
      
      <div className="flex flex-col shadow-xl bg-gray-100 mt-8 rounded-lg p-4 w-2/3">
        <h1 className="pb-4 text-3xl text-center">Edit Product: {name}</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="font-semibold">Product Name:</p>
            <p className="py-2 px-3 bg-gray-200 rounded">{name}</p>
            <p className="text-xs text-gray-500 mt-1">Product name cannot be edited</p>
          </div>
          
          <label>
            Price (USD):
            <input
              type="number"
              step="0.01"
              className="w-full p-2 mb-3 border rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          
          <label>
            Category:
            <select
              className="w-full p-2 mb-3 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Hoodie">Hoodie</option>
              <option value="T-shirt">T-shirt</option>
            </select>
          </label>
          
          <div className="mb-3">
            <p className="mb-2">Current Image:</p>
            <img 
              src={`${import.meta.env.VITE_BACKEND_URL}${currentImage}`} 
              alt={name} 
              className="h-40 object-contain mb-2 border rounded"
            />
          </div>
          
          <label>
            New Image (leave empty to keep current):
            <input
              type="file"
              className="w-full p-2 mb-3 border rounded"
              onChange={handleImageChange}
            />
          </label>
          
          <label>
            Description (max 100 characters):
            <textarea
              className="w-full p-2 mb-3 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="100"
              required
            />
            <div className="text-right text-sm text-gray-500">
              {description.length}/100
            </div>
          </label>
          
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 self-center mt-2"
          >
            Save Changes
          </button>
        </form>
        {message && <div className="mt-4 text-center text-red-500">{message}</div>}
      </div>
    </div>
  );
}