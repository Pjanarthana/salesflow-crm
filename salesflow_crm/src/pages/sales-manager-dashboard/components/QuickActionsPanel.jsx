import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const quickActions = [
    {
      id: 1,
      title: "Generate Team Report",
      description: "Create comprehensive team performance report",
      icon: "FileText",
      color: "primary",
      action: () => console.log("Generate report")
    },
    {
      id: 2,
      title: "Schedule Team Meeting",
      description: "Set up team sync or performance review",
      icon: "Calendar",
      color: "success",
      action: () => console.log("Schedule meeting")
    },
    {
      id: 3,
      title: "Bulk Lead Assignment",
      description: "Assign multiple leads to team members",
      icon: "Users",
      color: "warning",
      action: () => console.log("Bulk assign")
    },
    {
      id: 4,
      title: "Pipeline Forecast",
      description: "View and update sales forecasting",
      icon: "TrendingUp",
      color: "accent",
      action: () => console.log("View forecast")
    }
  ];

  const recentNotifications = [
    {
      id: 1,
      type: "high_value_deal",
      title: "High-Value Deal Alert",
      message: "Sarah Johnson's Enterprise Software License ($75K) moved to Proposal stage",
      time: "2 hours ago",
      icon: "DollarSign",
      color: "success"
    },
    {
      id: 2,
      type: "overdue_activity",
      title: "Overdue Follow-up",
      message: "3 leads assigned to Michael Chen require follow-up",
      time: "4 hours ago",
      icon: "AlertTriangle",
      color: "warning"
    },
    {
      id: 3,
      type: "quota_update",
      title: "Quota Achievement",
      message: "Emily Rodriguez achieved 85% of monthly quota",
      time: "1 day ago",
      icon: "Target",
      color: "primary"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success/20 hover:bg-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <Button variant="ghost" size="sm" iconName="Settings" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${getColorClasses(action?.color)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getColorClasses(action?.color)?.replace('hover:bg-', 'bg-')?.split(' ')?.[0]}`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{action?.title}</h4>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Notifications */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Recent Notifications</h3>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                iconName="Bell"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              <Button variant="ghost" size="sm" iconName="Settings" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {recentNotifications?.map((notification) => (
              <div key={notification?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <div className={`p-2 rounded-lg ${getColorClasses(notification?.color)?.split(' ')?.[0]}`}>
                  <Icon name={notification?.icon} size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm">{notification?.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{notification?.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notification?.time}</p>
                </div>
                <Button variant="ghost" size="sm" iconName="X" />
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="outline" size="sm" fullWidth iconName="Bell" iconPosition="left">
              View All Notifications
            </Button>
          </div>
        </div>
      </div>
      {/* Team Goals */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Team Goals</h3>
          <Button variant="ghost" size="sm" iconName="Edit" />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Monthly Revenue Target</span>
              <span className="text-sm text-muted-foreground">$437K / $500K</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '87.4%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">87.4% complete</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">New Leads Target</span>
              <span className="text-sm text-muted-foreground">164 / 200</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-success h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">82% complete</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Conversion Rate Target</span>
              <span className="text-sm text-muted-foreground">25.0% / 30.0%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-warning h-2 rounded-full" style={{ width: '83.3%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">83.3% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;