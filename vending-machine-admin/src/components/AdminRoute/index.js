import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';

const CHECK_AUTH = gql`
  query CheckAuthenticated {
    checkAuthenticated
  }
`;
const AdminRoute = ({ ...rest }) => {
  const location = useLocation();
  const [checkAuth] = useLazyQuery(CHECK_AUTH, {
    onError: (error) => {
      window.location.href = '/login';
    },
  });
  useEffect(() => {
    checkAuth();
  }, [location]);

  return <Route {...rest} />;
};

export default AdminRoute;
