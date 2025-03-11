// src/pages/CartPage.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../hooks/cartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-24 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-xl mb-8">Your cart is empty.</p>
        <Link to="/" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-24">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-4">Product</th>
              <th className="text-center pb-4">Price</th>
              <th className="text-center pb-4">Quantity</th>
              <th className="text-right pb-4">Total</th>
              <th className="text-right pb-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-4">
                  <div className="flex items-center">
                    <img 
                      src={`${import.meta.env.VITE_BACKEND_URL}${item.image}`} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <Link to={`/product/${item._id}`} className="font-medium hover:text-blue-600">
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  </div>
                </td>
                <td className="text-center py-4">${item.price.toFixed(2)}</td>
                <td className="text-center py-4">
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </td>
                <td className="text-right py-4">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="text-right py-4">
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <button 
              onClick={clearCart}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Clear Cart
            </button>
          </div>
          
          <div className="text-right">
            <div className="text-xl font-bold mb-2">
              Total: ${getCartTotal().toFixed(2)}
            </div>
            <Link 
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}