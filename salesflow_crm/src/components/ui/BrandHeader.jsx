import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const BrandHeader = ({ 
  userRole = 'Sales Rep', 
  userName = 'John Doe',
  onLogout = () => {},
  className = '' 
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    onLogout();
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-card border-b border-border ${className}`}>
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="BarChart3" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground">SalesFlow</h1>
            <span className="text-xs text-muted-foreground -mt-1">CRM</span>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-primary)" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">{userName}</span>
                <span className="text-xs text-muted-foreground">{userRole}</span>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
              />
            </Button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg elevation-2 animate-slide-down">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userRole}</p>
                </div>
                <div className="py-2">
                  <button className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors">
                    <Icon name="User" size={16} className="mr-3" />
                    Profile Settings
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors">
                    <Icon name="Settings" size={16} className="mr-3" />
                    Preferences
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors">
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Help & Support
                  </button>
                  <div className="border-t border-border mt-2 pt-2">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Icon name="LogOut" size={16} className="mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile User Menu Overlay */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default BrandHeader;