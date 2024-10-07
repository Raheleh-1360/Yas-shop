import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Firebase imports
import { signOut, onAuthStateChanged } from 'firebase/auth'; // Firebase sign-out and auth state methods
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'; // Firestore methods
import { updatePassword } from 'firebase/auth'; // Firebase method to update password
import {  useNavigate } from 'react-router-dom'; // For navigation

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state for user data
  const [authenticated, setAuthenticated] = useState(false); // To check if the user is authenticated
  const [loadingAuth, setLoadingAuth] = useState(true); // To handle loading state for authentication
  const navigate = useNavigate();
  const user = auth.currentUser;
  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setAuthenticated(true);
        fetchUserData();
        fetchUserOrders();
      } else {
        // If no user is logged in, redirect to login page
        setAuthenticated(false);
        navigate('/login');
      }
      setLoadingAuth(false); // Stop loading auth status after checking
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUserData = async () => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid); // Firestore users collection
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setName(userData.name || '');
        setEmail(userData.email || '');
      }
    }
    setLoading(false); // Stop loading after fetching user data
  };

  const fetchUserOrders = async () => {
    if (user) {
      const ordersCollection = collection(db, 'orders');
      const ordersQuery = query(ordersCollection, where('userId', '==', user.uid));
      const ordersSnapshot = await getDocs(ordersQuery);
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserOrders(ordersList);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear(); 
      sessionStorage.clear();
      alert('Signed out successfully!');
      navigate('/login'); // Redirect to login page after sign-out
    } catch (error) {
      alert('Error signing out: ', error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async () => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        name,
        email,
      });

      if (password) {
        await updatePassword(user, password);
        alert('Password updated successfully!');
      }

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile: ', error.message);
    }
  };

  // Loading spinner while checking authentication status
  if (loadingAuth) {
    return <div>Loading authentication...</div>;
  }
  // If user is not authenticated, return null (component won't render)
  if (!authenticated) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Account Information</h2>

          {isEditing ? (
            <div className="mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Update Name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Update Email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Update Password"
              />
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <>
              <p className="mb-2">
                <strong>Name:</strong> {name}
              </p>
              <p className="mb-4">
                <strong>Email:</strong> {email}
              </p>
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-teal-600"
              >
                Edit Profile
              </button>
            </>
          )}

            <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">Order History</h2>
          {userOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <>
              <ul>
                {userOrders.slice(0, 5).map((order) => (
                  <li key={order.id} className="mb-2">
                    Order #{order.id} - ${order.totalAmount}
                  </li>
                ))}
              </ul>
              {userOrders.length > 5 && (
                <button
                  onClick={() => navigate('/orders')}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-yellow-500 mt-4"
                >
                  Show All Orders
                </button>
              )}
            </>
          )}

          <hr className="my-6" />

          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
