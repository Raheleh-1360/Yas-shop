import React ,{ useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import top from '../assets/images/main/Top.jpg';
import heroImage from '../assets/images/main/shoping.jpeg';

import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'; 
import { Link } from 'react-router-dom';

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setProducts(productList);  // Update products state
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <div className="bg-teal-50 min-h-screen">
      <div className="relative">
        <img 
          src={top} 
          className="w-full h-[900px] object-top object-cover" // Ensures the image covers the full width and height of the screen
          alt="Online Shop" 
        />
        <div className="absolute bottom-69 inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <h1 className="text-white absolute  bottom-10 text-6xl font-bold text-center text-shadow">Welcome to My Shop</h1>
        </div>
      </div>
      <div className="bg-gradient-to-r from-teal-500 to-amber-500 py-20">
  <div className="container mx-auto text-center">
    <h2 className="text-white text-5xl font-bold mb-4">Discover the Best Deals Today!</h2>
    <p className="text-white text-lg mb-8">Find your favorite products at unbeatable prices.</p>
    <Link  href="/products" className="bg-white text-teal-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-teal-50 transition duration-300">
      Shop Now
    </Link>
  </div>
</div>


      {/* Product grid */}
      <div className="p-6">
        <h2 className="text-4xl text-teal-800 font-bold text-center mb-6">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
        </div>
      </div>       
        <div className="bg-white py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          {/* Hero Image */}
          <div className="w-full md:w-1/2">
            <img src={heroImage} alt="Hero" className="w-full h-auto rounded-lg shadow-lg" />
          </div>

          {/* Hero Text */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8">
            <h2 className="text-4xl font-bold text-teal-800">Why Choose Us?</h2>
            <p className="mt-4 text-gray-700 text-lg">
              Discover the best products carefully curated for your needs. 
              Our store offers a wide range of items to fit every occasion, 
              whether you're looking for quality, affordability, or something unique.
            </p>
            <p className="mt-4 text-gray-700 text-lg">
              Enjoy seamless shopping experience with our user-friendly platform. 
              With fast delivery, excellent customer service, and exclusive offers, 
              we're here to make your shopping easier and more enjoyable.
            </p>
           
          </div>
        </div>
      </div>
      </div>
  );
}


export default Home;
