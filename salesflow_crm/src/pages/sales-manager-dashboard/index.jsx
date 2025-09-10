import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '../../components/ui/BrandHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import TeamMetricsCard from './components/TeamMetricsCard';
import TeamPerformancePanel from './components/TeamPerformancePanel';
import TeamLeadsTable from './components/TeamLeadsTable';
import TeamOpportunitiesTable from './components/TeamOpportunitiesTable';
import QuickActionsPanel from './components/QuickActionsPanel';

const SalesManagerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const teamMetrics = [
    {
      title: "Total Team Leads",
      value: "164",
      change: "+12%",
      changeType: "positive",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Active Opportunities",
      value: "41",
      change: "+8%",
      changeType: "positive",
      icon: "Target",
      color: "success"
    },
    {
      title: "Pipeline Value",
      value: "$437K",
      change: "+15%",
      changeType: "positive",
      icon: "DollarSign",
      color: "accent"
    },
    {
      title: "Team Conversion Rate",
      value: "25.0%",
      change: "-2%",
      changeType: "negative",
      icon: "TrendingUp",
      color: "warning"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'team-leads':
        return <TeamLeadsTable />;
      case 'team-opportunities':
        return <TeamOpportunitiesTable />;
      case 'team-performance':
        return <TeamPerformancePanel />;
      default:
        return (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMetrics?.map((metric, index) => (
                <TeamMetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  color={metric?.color}
                />
              ))}
            </div>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Team Performance Panel */}
              <div className="lg:col-span-2">
                <TeamPerformancePanel />
              </div>

              {/* Quick Actions Panel */}
              <div className="lg:col-span-1">
                <QuickActionsPanel />
              </div>
            </div>
            {/* Recent Activity Tables */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Team Leads</h3>
                <TeamLeadsTable />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">High-Value Opportunities</h3>
                <TeamOpportunitiesTable />
              </div>
            </div>
          </div>
        );
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'team-leads', label: 'Team Leads', icon: 'Users' },
    { id: 'team-opportunities', label: 'Team Opportunities', icon: 'Target' },
    { id: 'team-performance', label: 'Team Performance', icon: 'TrendingUp' },
    { id: 'reports', label: 'Reports', icon: 'FileText' },
    { id: 'forecasting', label: 'Forecasting', icon: 'PieChart' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <BrandHeader
        userRole="Sales Manager"
        userName={userData?.name || "Sales Manager"}
        onLogout={handleLogout}
      />
      {/* Navigation */}
      <DashboardNavigation userRole="Sales Manager" />
      {/* Custom Tab Navigation */}
      <div className="bg-card border-b border-border">
        <div className="px-6">
          <div className="flex space-x-1 overflow-x-auto">
            {navigationItems?.map((item) => (
              <button
                key={item?.id}
                onClick={() => setActiveTab(item?.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === item?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <span>{item?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {renderTabContent()}
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} SalesFlow CRM. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>System Operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalesManagerDashboard;