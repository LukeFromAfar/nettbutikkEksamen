// src/components/CartIcon.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '../hooks/cartContext';

export default function CartIcon() {
  const { getCartCount } = useContext(CartContext);
  const count = getCartCount();
  
  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}