import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(auth); // Firebase hook to get auth state

  if (loading) {
    return <div>Loading...</div>; // Optional: Add a loading spinner here
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/admin/login" />
      }
    />
  );
};

export default PrivateRoute;
