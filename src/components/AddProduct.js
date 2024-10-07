import React, { useState } from 'react';
import { db } from '../firebase'; // Firestore database
import { collection, addDoc } from 'firebase/firestore';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'products'), product);  // Add product to Firestore
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full mb-4 p-2 border"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
