import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo Section */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl elevation-2">
          <Icon name="BarChart3" size={24} color="white" />
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold text-foreground">SalesFlow</h1>
          <span className="text-sm text-muted-foreground -mt-1">CRM</span>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground">
          Sign in to your account to access your sales dashboard
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;