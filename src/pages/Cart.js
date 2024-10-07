import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // or your preferred routing

function Cart({ cart, onUpdateQuantity, onRemoveItem }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } }); 
  };

  // Helper function to load the image path
  const getImagePath = (imageName) => {
    try {
      return require(`../assets/images/products/${imageName}`);
    } catch (err) {
      console.error(`Error loading image ${imageName}:`, err);
      return null; // Return null or a placeholder image if the image doesn't exist
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-4xl font-bold mb-4">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cart.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-md flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={getImagePath(item.image)} // Dynamically load the image
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-200 p-1 rounded-full"
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    className="bg-gray-200 p-1 rounded-full"
                    onClick={() => onUpdateQuantity(item.id, 1)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-green-500 item-center w-full mx-auto text-white px-6 py-2 my-auto rounded-lg hover:bg-green-800 mt-4"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
