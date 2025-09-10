import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '../../components/ui/BrandHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import SystemOverview from './components/SystemOverview';
import UserManagement from './components/UserManagement';
import RoleConfiguration from './components/RoleConfiguration';
import SystemSettings from './components/SystemSettings';
import AuditTrail from './components/AuditTrail';
import Icon from '../../components/AppIcon';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check authentication and role
    const token = localStorage.getItem('authToken');
    const userDataStr = localStorage.getItem('userData');

    if (!token || !userDataStr) {
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(userDataStr);
      if (user?.role !== 'Admin') {
        // Redirect to appropriate dashboard based on role
        const dashboardMap = {
          'Sales Manager': '/sales-manager-dashboard',
          'Sales Rep': '/sales-rep-dashboard'
        };
        navigate(dashboardMap?.[user?.role] || '/sales-rep-dashboard');
        return;
      }
      setUserData(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const tabItems = [
    { id: 'overview', label: 'System Overview', icon: 'BarChart3' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'roles', label: 'Role Configuration', icon: 'Shield' },
    { id: 'settings', label: 'System Settings', icon: 'Settings' },
    { id: 'audit', label: 'Audit Trail', icon: 'FileText' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <SystemOverview />;
      case 'users':
        return <UserManagement />;
      case 'roles':
        return <RoleConfiguration />;
      case 'settings':
        return <SystemSettings />;
      case 'audit':
        return <AuditTrail />;
      default:
        return <SystemOverview />;
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <BrandHeader
        userRole={userData?.role}
        userName={userData?.name}
        onLogout={handleLogout}
      />
      {/* Dashboard Navigation */}
      <DashboardNavigation userRole={userData?.role} />
      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-border">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabItems?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {new Date()?.getFullYear()} SalesFlow CRM</span>
              <span>•</span>
              <span>Admin Dashboard</span>
              <span>•</span>
              <span>Version 2.1.0</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>System Status: </span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-success font-medium">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;