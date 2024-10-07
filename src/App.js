import React, { useState,useEffect  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import OrderConfirmation from './pages/OrderConfirmation';
import NotificationModal from './components/NotificationModal';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css';
import Orders from './pages/orders';
import SearchResults from './pages/SearchResults';

function App() {
  // Cart state to manage cart items
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [notification, setNotification] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Update local storage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Function to handle adding products to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    }); // Add product to the cart
    setNotification(`${product.name} added to cart!`);

  };
  const handleUpdateQuantity = (id, amount) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
          : item
      )
    );
  };
  const handleRemoveItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleCloseNotification = () => {
    setNotification('');
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-teal-50">
      {/* Pass cart count to Navbar */}
        <Navbar isLoggedIn={isLoggedIn}  cartItems={cart.length} />
        
        <Routes>
          {/* Pass the handleAddToCart function to the Home page */}
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/products" element={<Products  onAddToCart={handleAddToCart}/>} />
          <Route path="/products/:id" element={<ProductDetails onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem}/>} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-confirmation" element={<OrderConfirmation clearCart={clearCart} />} />
          <Route path="/signup"  element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login"  element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/orders"  element={<Orders />} />
          <Route path="/search" element={<SearchResults />} />

        </Routes>
        {notification && <NotificationModal message={notification} onClose={handleCloseNotification} />}

        <Footer  />
      </div>
    </Router>
  );
}

export default App;
