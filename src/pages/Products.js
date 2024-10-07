import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'; // Make sure db is correctly imported from firebase config

const Products = ({ onAddToCart }) => {
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
    <div className="container mx-auto mt-4 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default Products;
