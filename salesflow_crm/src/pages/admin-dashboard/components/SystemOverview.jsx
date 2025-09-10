import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemOverview = () => {
  const systemMetrics = [
    {
      id: 'total-users',
      title: 'Total Users',
      value: '247',
      change: '+12',
      changeType: 'increase',
      icon: 'Users',
      color: 'bg-blue-500'
    },
    {
      id: 'active-sessions',
      title: 'Active Sessions',
      value: '89',
      change: '+5',
      changeType: 'increase',
      icon: 'Activity',
      color: 'bg-green-500'
    },
    {
      id: 'sales-reps',
      title: 'Sales Reps',
      value: '156',
      change: '+8',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'bg-purple-500'
    },
    {
      id: 'managers',
      title: 'Sales Managers',
      value: '23',
      change: '+2',
      changeType: 'increase',
      icon: 'Crown',
      color: 'bg-orange-500'
    },
    {
      id: 'admins',
      title: 'Administrators',
      value: '8',
      change: '0',
      changeType: 'neutral',
      icon: 'Shield',
      color: 'bg-red-500'
    },
    {
      id: 'system-health',
      title: 'System Health',
      value: '99.8%',
      change: '+0.2%',
      changeType: 'increase',
      icon: 'Heart',
      color: 'bg-emerald-500'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New user registered",
      user: "Sarah Johnson",
      timestamp: "2 minutes ago",
      type: "user_created",
      icon: "UserPlus"
    },
    {
      id: 2,
      action: "Role updated",
      user: "Mike Chen",
      details: "Sales Rep → Sales Manager",
      timestamp: "15 minutes ago",
      type: "role_updated",
      icon: "UserCog"
    },
    {
      id: 3,
      action: "User deactivated",
      user: "Alex Rodriguez",
      timestamp: "1 hour ago",
      type: "user_deactivated",
      icon: "UserX"
    },
    {
      id: 4,
      action: "System backup completed",
      timestamp: "2 hours ago",
      type: "system_backup",
      icon: "Download"
    },
    {
      id: 5,
      action: "Security settings updated",
      user: "Admin",
      timestamp: "4 hours ago",
      type: "security_update",
      icon: "Shield"
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'increase':
        return 'text-success';
      case 'decrease':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_created':
        return 'UserPlus';
      case 'role_updated':
        return 'UserCog';
      case 'user_deactivated':
        return 'UserX';
      case 'system_backup':
        return 'Download';
      case 'security_update':
        return 'Shield';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {systemMetrics?.map((metric) => (
          <div key={metric?.id} className="bg-card border border-border rounded-lg p-4 elevation-1">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${metric?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={metric?.icon} size={20} color="white" />
              </div>
              <div className={`text-sm font-medium ${getChangeColor(metric?.changeType)}`}>
                {metric?.change}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{metric?.value}</p>
              <p className="text-sm text-muted-foreground">{metric?.title}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent System Activity</h3>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            View All Activity
          </button>
        </div>
        <div className="space-y-3">
          {recentActivity?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={getActivityIcon(activity?.type)} size={14} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-foreground">{activity?.action}</p>
                  {activity?.user && (
                    <span className="text-sm text-primary font-medium">{activity?.user}</span>
                  )}
                </div>
                {activity?.details && (
                  <p className="text-xs text-muted-foreground mt-1">{activity?.details}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">{activity?.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;