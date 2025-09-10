import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'lead_created':
        return { icon: 'UserPlus', color: 'text-blue-600', bg: 'bg-blue-100' };
      case 'lead_converted':
        return { icon: 'ArrowRight', color: 'text-green-600', bg: 'bg-green-100' };
      case 'opportunity_created':
        return { icon: 'Target', color: 'text-purple-600', bg: 'bg-purple-100' };
      case 'opportunity_won':
        return { icon: 'Trophy', color: 'text-amber-600', bg: 'bg-amber-100' };
      case 'opportunity_lost':
        return { icon: 'X', color: 'text-red-600', bg: 'bg-red-100' };
      case 'status_updated':
        return { icon: 'Edit', color: 'text-gray-600', bg: 'bg-gray-100' };
      default:
        return { icon: 'Activity', color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Icon name="Activity" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="p-6">
        {activities?.length > 0 ? (
          <div className="space-y-4">
            {activities?.map((activity) => {
              const iconConfig = getActivityIcon(activity?.type);
              
              return (
                <div key={activity?.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full ${iconConfig?.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={iconConfig?.icon} size={14} className={iconConfig?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity?.title}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{activity?.description}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="text-xs text-muted-foreground">{formatTimeAgo(activity?.timestamp)}</span>
                      {activity?.value && (
                        <>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs font-medium text-success">{activity?.value}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={40} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
            <p className="text-xs text-muted-foreground mt-1">Your recent actions will appear here</p>
          </div>
        )}
      </div>
      {activities?.length > 0 && (
        <div className="px-6 py-3 border-t border-border bg-muted/20">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;