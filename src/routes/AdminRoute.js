import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../authFunctions/auth';

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then(() => {
          // When [ok] have true state user will redirect to admin dashboard
          setOk(true);
        })
        .catch((err) => {
          console.log('ADMIN ROUTE ERR ---->', err);
          // If token will not have [ok] will be false and user will redirect to login page
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
