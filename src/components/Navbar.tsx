import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, ShoppingCart, Menu, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import LoginModal from './LoginModal';

function Navbar() {
  const { state } = useCart();
  const { user, logout } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-teal-600">Zwigato</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{user?.address || 'Select Location'}</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link 
              to="/cart" 
              className="flex items-center space-x-1 text-gray-700 hover:text-teal-600"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                {state.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-teal-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {state.items.length}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Cart</span>
            </Link>
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="text-gray-700">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-teal-600 hover:text-teal-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden md:block px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700"
              >
                Login
              </button>
            )}
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
}

export default Navbar;