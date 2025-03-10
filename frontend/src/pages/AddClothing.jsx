import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddClothing() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hoodie");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      } else {
        setMessage("Error adding clothing");
      }
    }
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="flex flex-col shadow-xl bg-gray-100 mt-8 rounded-lg p-4 w-2/3">
        <h1 className="pb-4 text-3xl text-center">Add New Clothing</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>
            Apparel Name:
            <input
              type="text"
              className="w-full p-2 mb-3 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          
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
            Sub-genre:
            <select
              className="w-full p-2 mb-3 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Hoodie">Hoodie</option>
              <option value="T-shirt">T-shirt</option>
            </select>
          </label>
          
          <label>
            Image:
            <input
              type="file"
              className="w-full p-2 mb-3 border rounded"
              onChange={handleImageChange}
              required
            />
          </label>
          
          <label>
            Apparel Description (max 100 characters):
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
            Add Clothing
          </button>
        </form>
        {message && <div className="mt-4 text-center text-red-500">{message}</div>}
      </div>
    </div>
  );
}