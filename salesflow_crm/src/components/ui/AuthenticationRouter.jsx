import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthenticationRouter = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    isLoading: true
  });
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        if (!token || !userData) {
          setAuthState({
            isAuthenticated: false,
            userRole: null,
            isLoading: false
          });
          return;
        }

        // Parse and validate token
        const tokenData = JSON.parse(atob(token?.split('.')?.[1]));
        const currentTime = Date.now() / 1000;

        if (tokenData?.exp < currentTime) {
          // Token expired, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          setAuthState({
            isAuthenticated: false,
            userRole: null,
            isLoading: false
          });
          return;
        }

        // Parse user data
        const user = JSON.parse(userData);
        setAuthState({
          isAuthenticated: true,
          userRole: user?.role || 'Sales Rep',
          isLoading: false
        });
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setAuthState({
          isAuthenticated: false,
          userRole: null,
          isLoading: false
        });
      }
    };

    checkAuthStatus();

    // Listen for storage changes (logout from another tab)
    const handleStorageChange = (e) => {
      if (e?.key === 'authToken' || e?.key === 'userData') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

  const isAuthRoute = () => {
    return ['/login', '/register']?.includes(location?.pathname);
  };

  if (authState?.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg
                className="w-6 h-6 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">SalesFlow</h1>
              <span className="text-sm text-muted-foreground">CRM</span>
            </div>
          </div>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading application...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated and trying to access auth routes, redirect to dashboard
  if (authState?.isAuthenticated && isAuthRoute()) {
    const defaultDashboard = getDefaultDashboard(authState?.userRole);
    return <Navigate to={defaultDashboard} replace />;
  }

  // If user is not authenticated and trying to access protected routes, redirect to login
  if (!authState?.isAuthenticated && !isAuthRoute()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthenticationRouter;