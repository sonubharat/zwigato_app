import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <div className="min-h-screen bg-cream">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;