import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons
import SearchBar from './SearchBar';

function Navbar({ cartItems, isLoggedIn }) {
  return (
    <nav className="bg-teal-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Shop Title */}
        <a href="/" className="text-amber-600 text-xl font-bold">Yas Shop </a>

        {/* Search Bar */}
        <SearchBar />


        {/* Navigation Links */}
        <ul className="flex space-x-4 items-center">
          <li>
            <a href="/" className="text-white hover:text-gray-400">Home</a>
          </li>
          <li>
            <a href="/products" className="text-white hover:text-gray-400">Products</a>
          </li>

          {/* Cart Icon with Badge */}
          <li>
            <a href="/cart" className="relative text-white hover:text-gray-400">
              <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6 inline-block" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </a>
          </li>

          {/* Conditional Links: Login/Signup or Profile based on `isLoggedIn` */}
          {isLoggedIn ? (
            // Show Profile Link if Logged In
            <li>
              <a href="/profile" className="text-white hover:text-gray-400">
                <FontAwesomeIcon icon={faUser} className="h-6 w-6 inline-block mr-1" />
                Profile
              </a>
            </li>
          ) : (
            <>
              {/* Show Login and Signup Links if Not Logged In */}
              <li>
                <a href="/login" className="text-white hover:text-gray-400">
                  <FontAwesomeIcon icon={faSignInAlt} className="h-6 w-6 inline-block mr-1" />
                  Login 
                </a>
              </li>
              
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
