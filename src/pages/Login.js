import React, { useState } from 'react';
import { auth } from '../firebase';  // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash ,faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import login from '../assets/images/main/login.jpg';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);  // Update login state
      alert('Logged in successfully!');
      navigate('/profile'); 
    } catch (error) {
      alert(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-teal-800 text-center mb-6">Login to Your Account</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full py-2 px-3 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            {/* Password Input with Show/Hide */}
            <div className="flex items-center border-b-2 border-gray-300 py-2">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full py-2 px-3 focus:outline-none focus:border-indigo-500"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-gray-400 cursor-pointer ml-2"
                onClick={togglePasswordVisibility}
              />
            </div>

            {/* Forgot Password Link
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm text-teal-500 hover:underline">
                Forgot password?
              </a>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-teal-800 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            
            <div className="flex justify-end">
            <p  className="mx-auto text-teal-800 items-left" >If You Don't Have Acount </p>
            
                <a href="/signup" className="mx-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-teal-500 text-sm text-white hover:underline"><FontAwesomeIcon icon={faUserPlus} className="h-5 w-5 mr-1" /> SignUp  </a>
            </div>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src={login}
            alt="Login "
            className="w-full h-full object-cover rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
