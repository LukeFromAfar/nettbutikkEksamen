import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="h-64 overflow-hidden">
          <img 
            src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`} 
            alt={product.name} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.category}</p>
          <p className="font-medium">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}