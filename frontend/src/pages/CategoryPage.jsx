import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // Fetch all products and filter by category on the client-side
        // You could also create a dedicated API endpoint for category filtering
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        const filteredProducts = response.data.filter(
          product => product.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  if (loading) return <div className="pt-20 text-center">Loading products...</div>;
  if (error) return <div className="pt-20 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="mb-4">
        <Link to="/" className="text-blue-500 hover:underline">← Back to Home</Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6 capitalize">{category}</h1>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}