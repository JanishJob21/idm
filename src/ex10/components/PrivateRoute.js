import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect to login page if not authenticated
    return <Navigate to="/ex10/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
