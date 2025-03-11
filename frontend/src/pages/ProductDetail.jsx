// src/pages/ProductDetail.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../hooks/authContext";
import { CartContext } from "../hooks/cartContext";
import { Minus, Plus } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const isAdmin = user && user.role === "admin";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    // Confirm before deleting
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  if (loading) return <div className="pt-20 text-center">Loading product details...</div>;
  if (error) return <div className="pt-20 text-center text-red-500">{error}</div>;
  if (!product) return <div className="pt-20 text-center">Product not found</div>;

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="mb-4">
        <Link to="/" className="text-blue-500 hover:underline">← Back to Home</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`} 
            alt={product.name} 
            className="w-full h-auto"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4">Quantity:</span>
            <div className="flex items-center border rounded">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 border-r hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 border-l hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md mr-4"
          >
            Add to Cart
          </button>
          
          {/* Admin Buttons */}
          {isAdmin && (
            <div className="flex gap-4 mt-4">
              <Link
                to={`/edit-clothing/${product._id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                EDIT
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                DELETE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}