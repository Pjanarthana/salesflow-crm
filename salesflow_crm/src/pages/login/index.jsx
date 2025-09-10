import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import DemoCredentials from './components/DemoCredentials';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        const dashboardRoutes = {
          'Sales Rep': '/sales-rep-dashboard',
          'Sales Manager': '/sales-manager-dashboard',
          'Admin': '/admin-dashboard'
        };
        
        if (dashboardRoutes?.[user?.role]) {
          navigate(dashboardRoutes?.[user?.role], { replace: true });
        }
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      {/* Login Container */}
      <div className="relative w-full max-w-md">
        {/* Main Login Card */}
        <div className="bg-card border border-border rounded-xl elevation-2 p-8">
          <LoginHeader />
          <LoginForm />
          <DemoCredentials />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} SalesFlow CRM. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </button>
            <span className="text-xs text-border">•</span>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </button>
            <span className="text-xs text-border">•</span>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Support
            </button>
          </div>
        </div>
      </div>
      {/* Security Badge */}
      <div className="absolute bottom-4 right-4 hidden md:flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
        <div className="w-2 h-2 bg-success rounded-full"></div>
        <span className="text-xs text-muted-foreground">Secure Connection</span>
      </div>
    </div>
  );
};

export default LoginPage;