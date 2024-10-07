import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Import your Firebase configuration file
import top from '../assets/images/main/fashion.jpg';

function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart } = location.state || {}; // Access the cart passed from the previous page
  const [orderId, setOrderId] = useState(null);

  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleContinueShopping = async () => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;

      try {
        // Create order in Firestore
        const ordersCollection = collection(db, 'orders');
        const orderData = {
          items: cart,
          totalAmount: calculateTotal(cart),
          userId: userId,
          createdAt: new Date()
        };
        const docRef = await addDoc(ordersCollection, orderData);
        setOrderId(docRef.id);

        // Clear cart if the function is provided
        if (clearCart) {
          clearCart();
        }
        // Clear cart by removing it from local storage
        localStorage.removeItem('cart');
        // Redirect to profile page
        navigate('/profile');
      } catch (error) {
        console.error('Error creating order: ', error);
        alert('Failed to create order');
      }
    } else {
      // Redirect to login page if not authenticated
      navigate('/login', { state: { message: 'You should log in first.' } });
    }
  };

  return (
    <div>
       <div className="relative">
        <img 
          src={top} 
          className="w-full h-[500px] object-top object-cover" // Ensures the image covers the full width and height of the screen
          alt="Online Shop" 
        />
        <div className="absolute bottom-69 inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <h2 className="text-white absolute  bottom-10 text-6xl font-bold text-center text-shadow"> Thank You for Your Order!</h2>
         
        </div>
      </div>
    <div className="bg-gray-100 min-h-screen p-6">
     
      <div className="container mx-auto text-center">
        <p className="text-gray-700 mb-6 text-3xl">Your order has been placed successfully.</p>

        <div className="bg-white p-8 rounded-lg shadow-lg inline-block w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-teal-800">Order Summary</h2>
          <ul className="text-left mb-4">
            {cart.map(item => (
              <li key={item.id} className="mb-2 flex justify-between">
                <span>{item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold mt-4 text-gray-900">Total: ${calculateTotal(cart).toFixed(2)}</p>
        </div>

        <button
          className="w-full bg-green-500 text-white px-6 py-2 mt-6 rounded-lg hover:bg-teal-600 transition duration-300 ease-in-out"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
    </div>
  );
}

export default OrderConfirmation;
