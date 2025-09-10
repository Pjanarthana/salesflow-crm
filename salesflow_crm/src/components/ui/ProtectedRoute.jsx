import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null,
  allowedRoles = [],
  redirectTo = '/login' 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        if (!token || !userData) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Parse user data
        const user = JSON.parse(userData);
        const role = user?.role || 'Sales Rep';

        // Validate token (basic check - in production, verify with backend)
        const tokenData = JSON.parse(atob(token?.split('.')?.[1]));
        const currentTime = Date.now() / 1000;

        if (tokenData?.exp < currentTime) {
          // Token expired
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUserRole(role);
        setIsLoading(false);
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const hasRequiredRole = () => {
    if (!requiredRole && allowedRoles?.length === 0) {
      return true; // No role restrictions
    }

    if (requiredRole && userRole === requiredRole) {
      return true;
    }

    if (allowedRoles?.length > 0 && allowedRoles?.includes(userRole)) {
      return true;
    }

    return false;
  };

  const getDefaultDashboard = (role) => {
    switch (role) {
      case 'Sales Manager':
        return '/sales-manager-dashboard';
      case 'Admin':
        return '/admin-dashboard';
      default:
        return '/sales-rep-dashboard';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!hasRequiredRole()) {
    // Redirect to appropriate dashboard based on user role
    const defaultDashboard = getDefaultDashboard(userRole);
    return <Navigate to={defaultDashboard} replace />;
  }

  return children;
};

export default ProtectedRoute;