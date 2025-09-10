import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegisterHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6 mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-3">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
          <Icon name="BarChart3" size={24} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">SalesFlow</h1>
          <span className="text-sm text-muted-foreground">CRM</span>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Create Your Account</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Join SalesFlow CRM to streamline your sales process and manage leads effectively
        </p>
      </div>

      {/* Login Link */}
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className="text-muted-foreground">Already have an account?</span>
        <Button
          variant="link"
          onClick={() => navigate('/login')}
          className="p-0 h-auto font-medium"
        >
          Sign in here
        </Button>
      </div>
    </div>
  );
};

export default RegisterHeader;