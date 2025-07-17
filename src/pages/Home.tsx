import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-6xl font-bold mb-2" style={{ fontFamily: 'Baleny' }}>Zwigato</h1>
        <p className="text-xl" style={{ fontFamily: 'Open Sans' }}>Crave it. Click it. Eat happy.</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <section className="relative bg-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Delicious food delivered fast
              </h1>
              <p className="text-lg mb-6">
                Order your favorite meals from the best local restaurants
              </p>
              <button className="px-6 py-3 bg-cream text-teal-600 rounded-lg font-semibold hover:bg-white transition-colors">
                Start Ordering
              </button>
            </div>
            <div className="md:w-1/2">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                className="rounded-lg shadow-xl"
              >
                {featuredDishes.map((dish) => (
                  <SwiperSlide key={dish.id}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-[400px] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                      <h3 className="text-xl font-semibold">{dish.name}</h3>
                      <p>{dish.description}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Our Menu</h2>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg">
              Pure Veg Only
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                to={`/category/${category.id}`}
                key={category.id}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-center font-medium text-gray-800">{category.name}</p>
                <p className="text-center text-sm text-gray-500">{category.items} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const featuredDishes = [
  {
    id: "f1",
    name: "Supreme Pizza",
    description: "Loaded with fresh toppings and melted cheese",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "f2",
    name: "Gourmet Burger",
    description: "Premium patty with artisanal toppings",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "f3",
    name: "Spicy Noodles",
    description: "Hand-pulled noodles in aromatic sauce",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80"
  }
];

const categories = [
  {
    id: "1",
    name: "Pizza",
    items: 12,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "2",
    name: "Burgers",
    items: 8,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "3",
    name: "Noodles",
    items: 10,
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "4",
    name: "Momos",
    items: 6,
    image: "https://img.freepik.com/free-photo/khinkali-served-with-greens-sauce_141793-773.jpg?t=st=1744865420~exp=1744869020~hmac=9d4fe1b65b64c98cb9656b3351b3025b909f729a9e1d43ff97cca173a89a36da&w=740"
  }
];

export default Home;