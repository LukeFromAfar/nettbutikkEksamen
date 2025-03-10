import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Get the newest products (up to 6)
  const newestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 6);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearch = () => {
    if (selectedCategory) {
      navigate(`/category/${selectedCategory}`);
    }
  };

  if (loading) return <div className="pt-20 text-center">Loading products...</div>;
  if (error) return <div className="pt-20 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 pt-20">
      {/* Category Search */}
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        <select 
          value={selectedCategory} 
          onChange={handleCategoryChange}
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button 
          onClick={handleSearch} 
          disabled={!selectedCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Search
        </button>
      </div>

      {/* Newest Products Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Newest Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {newestProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Sections */}
      {Object.entries(productsByCategory).map(([category, items]) => (
        <section key={category} className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {items.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      ))}

      {/* If no products */}
      {products.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl">No products available yet.</p>
        </div>
      )}
    </div>
  );
}