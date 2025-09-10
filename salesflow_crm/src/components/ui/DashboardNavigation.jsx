import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const DashboardNavigation = ({ 
  userRole = 'Sales Rep',
  className = '' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'overview', label: 'Overview', icon: 'BarChart3' },
      { id: 'opportunities', label: 'Opportunities', icon: 'Target', path: '/opportunities-management' },
    ];

    switch (userRole) {
      case 'Sales Manager':
        return [
          ...baseItems,
          { id: 'team', label: 'Team Performance', icon: 'Users' },
          { id: 'reports', label: 'Reports', icon: 'FileText' },
          { id: 'forecasting', label: 'Forecasting', icon: 'TrendingUp' },
        ];
      case 'Admin':
        return [
          ...baseItems,
          { id: 'users', label: 'User Management', icon: 'UserCog' },
          { id: 'settings', label: 'System Settings', icon: 'Settings' },
          { id: 'analytics', label: 'Analytics', icon: 'PieChart' },
        ];
      default: // Sales Rep
        return [
          ...baseItems,
          { id: 'leads', label: 'My Leads', icon: 'UserPlus' },
          { id: 'activities', label: 'Activities', icon: 'Calendar' },
        ];
    }
  };

  const navigationItems = getNavigationItems();

  const handleNavigation = (item) => {
    if (item?.path) {
      navigate(item?.path);
    } else {
      setActiveTab(item?.id);
    }
  };

  const isActive = (item) => {
    if (item?.path) {
      return location?.pathname === item?.path;
    }
    return activeTab === item?.id;
  };

  const getQuickActions = () => {
    switch (userRole) {
      case 'Sales Manager':
        return [
          { label: 'Add Team Member', icon: 'UserPlus', variant: 'outline' },
          { label: 'Generate Report', icon: 'FileText', variant: 'outline' },
          { label: 'New Opportunity', icon: 'Plus', variant: 'default' },
        ];
      case 'Admin':
        return [
          { label: 'Add User', icon: 'UserPlus', variant: 'outline' },
          { label: 'System Backup', icon: 'Download', variant: 'outline' },
          { label: 'New Campaign', icon: 'Plus', variant: 'default' },
        ];
      default: // Sales Rep
        return [
          { label: 'Add Lead', icon: 'UserPlus', variant: 'outline' },
          { label: 'Log Activity', icon: 'Calendar', variant: 'outline' },
          { label: 'New Opportunity', icon: 'Plus', variant: 'default' },
        ];
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className={`bg-card border-b border-border ${className}`}>
      {/* Navigation Tabs */}
      <div className="px-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            {userRole === 'Sales Manager' ? 'Manager Dashboard' : 
             userRole === 'Admin'? 'Admin Dashboard' : 'Sales Dashboard'}
          </h2>
          <div className="flex items-center space-x-2">
            {quickActions?.map((action, index) => (
              <Button
                key={index}
                variant={action?.variant}
                size="sm"
                iconName={action?.icon}
                iconPosition="left"
                className="micro-interaction"
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1 border-b border-border">
          {navigationItems?.map((item) => (
            <button
              key={item?.id}
              onClick={() => handleNavigation(item)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                isActive(item)
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto space-x-2 pb-4 scrollbar-hide">
            {navigationItems?.map((item) => (
              <button
                key={item?.id}
                onClick={() => handleNavigation(item)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg min-w-max transition-all duration-200 ${
                  isActive(item)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span className="text-xs font-medium">{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Role-specific Context Bar */}
      <div className="px-6 py-3 bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              {userRole === 'Sales Manager' ? 'Team Performance' : 
               userRole === 'Admin'? 'System Status' : 'My Performance'}
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-success text-xs font-medium">
                {userRole === 'Sales Manager' ? 'Team Active' : 
                 userRole === 'Admin'? 'All Systems Operational' : 'On Track'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span>Last updated: 2 min ago</span>
            <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
              Refresh
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavigation;