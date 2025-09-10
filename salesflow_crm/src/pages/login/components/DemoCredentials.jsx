import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DemoCredentials = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials = [
    {
      role: 'Sales Rep',
      email: 'sales.rep@salesflow.com',
      password: 'SalesRep123!',
      description: 'Individual contributor with personal lead management'
    },
    {
      role: 'Sales Manager',
      email: 'sales.manager@salesflow.com',
      password: 'Manager123!',
      description: 'Team leader with full team visibility and analytics'
    },
    {
      role: 'Admin',
      email: 'admin@salesflow.com',
      password: 'Admin123!',
      description: 'System administrator with user management access'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Key" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm font-medium text-muted-foreground">
            Demo Credentials
          </span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          color="var(--color-muted-foreground)"
        />
      </button>
      {isExpanded && (
        <div className="mt-4 space-y-4 animate-slide-down">
          <p className="text-xs text-muted-foreground">
            Use these credentials to test different user roles:
          </p>
          
          {credentials?.map((cred, index) => (
            <div key={index} className="p-3 bg-card rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-foreground">{cred?.role}</h4>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Copy"
                    onClick={() => copyToClipboard(cred?.email)}
                    className="h-6 w-6 p-0"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{cred?.description}</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Email:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {cred?.email}
                  </code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Password:</span>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {cred?.password}
                  </code>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex items-center space-x-2 p-2 bg-primary/5 rounded border border-primary/20">
            <Icon name="Info" size={14} color="var(--color-primary)" />
            <p className="text-xs text-primary">
              Click the copy icon to copy credentials to clipboard
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;