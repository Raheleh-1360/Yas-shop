import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure db is imported correctly

function ProductDetails({ onAddToCart }) {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
 

  // Fetch single product from Firestore based on the ID
  const fetchProduct = async () => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such product!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }
  const imagePath = require(`../assets/images/products/${product.image}`);
  return (
    <main className="flex-grow container mx-auto mt-10">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/2 mb-10">
          <img src={imagePath} alt={product.name} className="rounded-lg shadow-lg" />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl text-teal-800 font-bold mb-4">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-gray-900 mb-4"><span className='text-teal-600'>Price :</span> ${product.price}</p>

          <button className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-teal-600" onClick={() => onAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
