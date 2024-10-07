import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // To get the query from URL and for product detail links
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore db

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const searchQuery = useQuery().get('q'); // Get the search query from URL
  
  // Helper function to load the image path
  const getImagePath = (imageName) => {
    try {
      return require(`../assets/images/products/${imageName}`);
    } catch (err) {
      console.error(`Error loading image ${imageName}:`, err);
     
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const fetchProducts = async () => {
        try {
          const q = query(
            collection(db, 'products'),
            where('name', '>=', searchQuery),
            where('name', '<=', searchQuery + '\uf8ff') // For partial matches
          );

          const querySnapshot = await getDocs(q);
          const fetchedProducts = [];
          querySnapshot.forEach((doc) => {
            fetchedProducts.push({ id: doc.id, ...doc.data() });
          });

          setProducts(fetchedProducts);
        } catch (error) {
          setError('Failed to fetch products');
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [searchQuery]);

  if (loading) return <div className="text-center mt-6">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-6">{error}</div>;
  if (products.length === 0) return <div className="text-center mt-6">No products found for "{searchQuery}"</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Search Results for "{searchQuery}"</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product.id} className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
            <Link to={`/product/${product.id}`} className="block">
              <img
                src={getImagePath(product.image)}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4 "
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                View Details
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
