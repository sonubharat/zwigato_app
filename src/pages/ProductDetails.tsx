import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const products = {
  "1": [
    {
      id: "p1",
      name: "Margherita Pizza",
      price: 299,
      description: "Classic tomato sauce, mozzarella, and basil",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "p2",
      name: "Pepperoni Pizza",
      price: 399,
      description: "Tomato sauce, mozzarella, and spicy pepperoni",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80",
      isVeg: false
    },
    {
      id: "p3",
      name: "Paneer Tikka Pizza",
      price: 349,
      description: "Spiced paneer, bell peppers, and onions",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
      isVeg: true
    }
  ],
  "2": [
    {
      id: "b1",
      name: "Veggie Burger",
      price: 199,
      description: "Mixed vegetable patty with special sauce",
      image: "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "b2",
      name: "Chicken Burger",
      price: 179,
      description: "Grilled chicken with special sauce",
      image: "https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=500&q=80",
      isVeg: false
    }
  ],
  "3": [
    {
      id: "n1",
      name: "Veg Hakka Noodles",
      price: 149,
      description: "Stir-fried noodles with mixed vegetables",
      image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=500&q=80",
      isVeg: true
    },
    {
      id: "n2",
      name: "Chicken Chow Mein",
      price: 199,
      description: "Noodles with shredded chicken and vegetables",
      image: "https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/speedy-chicken-noodles-77fcb3f3-06751e5a.jpg",
      isVeg: false
    }
  ],
  "4": [
    {
      id: "m1",
      name: "Veg Momos",
      price: 129,
      description: "Steamed dumplings with mixed vegetables",
      image: "https://img.freepik.com/free-photo/khinkali-served-with-greens-sauce_141793-773.jpg?t=st=1744865420~exp=1744869020~hmac=9d4fe1b65b64c98cb9656b3351b3025b909f729a9e1d43ff97cca173a89a36da&w=740",
      isVeg: true
    },
    {
      id: "m2",
      name: "Chicken Momos",
      price: 149,
      description: "Steamed dumplings with minced chicken",
      image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=500&q=80",
      isVeg: false
    }
  ]
};

function ProductDetails() {
  const { categoryId } = useParams();
  const { dispatch } = useCart();
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const categoryProducts = categoryId ? products[categoryId as keyof typeof products] : [];
  
  const filteredProducts = showVegOnly 
    ? categoryProducts.filter(product => product.isVeg)
    : categoryProducts;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [categoryId]);

  const handleAddToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity: 1 }
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Menu</h2>
        <button
          onClick={() => setShowVegOnly(!showVegOnly)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            showVegOnly 
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Pure Veg Only
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4">
                <div className={`w-6 h-6 rounded-full border-2 ${
                  product.isVeg 
                    ? 'border-green-600 bg-green-100'
                    : 'border-red-600 bg-red-100'
                } flex items-center justify-center`}>
                  <div className={`w-3 h-3 rounded-full ${
                    product.isVeg ? 'bg-green-600' : 'bg-red-600'
                  }`}></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-teal-600">
                  ₹{product.price}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;