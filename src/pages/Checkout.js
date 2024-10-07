import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase'; // Firebase imports

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = location.state || {}; // Access the cart passed from Cart page

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Replace this with your actual authentication check logic
    const checkAuthentication = () => {
    const user = auth.currentUser;
      if (user) {
        setIsAuthenticated(true);
      } else {
        // Redirect to login if not authenticated
        navigate('/login', { state: { message: 'You must log in to complete your order' } });
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handlePlaceOrder = () => {
    if (isAuthenticated && cart.length > 0) {
      // Create order logic (e.g., sending data to the server)
      console.log('Placing order:', cart);

      // After successful order creation, you can redirect to a confirmation page
      navigate('/order-confirmation', { state: { cart } });
      
    }
  };

  if (!cart || cart.length === 0) {
    return <p>Your cart is empty. Please add items to the cart first.</p>;
  }

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-4xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cart.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <img
                src={require(`../assets/images/products/${item.image}`)}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="w-full item-center bg-teal-600 text-white px-6 py-2 my-auto rounded-lg hover:bg-teal-800 mt-4"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
