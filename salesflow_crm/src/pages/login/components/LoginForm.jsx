import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user roles
  const mockCredentials = {
    'sales.rep@salesflow.com': { password: 'SalesRep123!', role: 'Sales Rep' },
    'sales.manager@salesflow.com': { password: 'Manager123!', role: 'Sales Manager' },
    'admin@salesflow.com': { password: 'Admin123!', role: 'Admin' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockUser = mockCredentials?.[formData?.email];
      
      if (!mockUser || mockUser?.password !== formData?.password) {
        setErrors({
          general: 'Invalid email or password. Please check your credentials and try again.'
        });
        setIsLoading(false);
        return;
      }

      // Create mock JWT token
      const mockToken = btoa(JSON.stringify({
        sub: formData?.email,
        role: mockUser?.role,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      }));

      // Store authentication data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify({
        email: formData?.email,
        role: mockUser?.role,
        name: mockUser?.role === 'Sales Rep' ? 'John Doe' : 
              mockUser?.role === 'Sales Manager' ? 'Sarah Johnson' : 'Mike Admin',
        loginTime: new Date()?.toISOString()
      }));

      // Redirect based on role
      const dashboardRoutes = {
        'Sales Rep': '/sales-rep-dashboard',
        'Sales Manager': '/sales-manager-dashboard',
        'Admin': '/admin-dashboard'
      };

      navigate(dashboardRoutes?.[mockUser?.role]);
      
    } catch (error) {
      setErrors({
        general: 'An error occurred during login. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here. For demo purposes, use the provided mock credentials.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="var(--color-error)" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Create Account Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-primary hover:text-primary/80 font-medium transition-colors"
              disabled={isLoading}
            >
              Create Account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;