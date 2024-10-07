import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import register from '../assets/images/main/register.jpg';

const Signup = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setIsLoggedIn(true);  // Update login state
      alert('Account created successfully!');
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
          <h2 className="text-2xl font-bold text-teal-800 text-center mb-6">Create Your Account</h2>
          <form onSubmit={handleSignup} className="space-y-6">
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

            <button
              type="submit"
              className="w-full bg-teal-800 hover:bg-teal-600 text-white font-bold relative top-20 py-4 px-4 rounded focus:outline-none focus:shadow-outline" >
              Sign Up
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src={register}
            alt="Signup Online Shop"
            className="w-full h-full object-cover rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};  


export default Signup;
