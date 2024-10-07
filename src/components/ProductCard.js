import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const imagePath = require(`../assets/images/products/${product.image}`);

  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col justify-between h-full">
      {/* Link for product details */}
      <Link to={`/products/${product.id}`} className="mb-4">
        <img 
          src={imagePath} 
          alt={product.name} 
          className="w-full h-54 object-cover rounded-lg mb-4"
        />
      </Link>
      
      {/* Product name and price */}
      <div className="flex-grow">
        <h2 className="text-lg mt-2">{product.name}</h2>
        <p className="text-gray-500">${product.price}</p>
      </div>

      {/* Add to Cart button */}
      <button
        className="bg-amber-600 text-white py-2 px-6 rounded-lg hover:bg-teal-600 mt-4"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
