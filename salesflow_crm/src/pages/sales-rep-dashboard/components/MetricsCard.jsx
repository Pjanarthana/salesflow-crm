import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, icon, color, trend, trendValue, subtitle }) => {
  const getColorClasses = (colorType) => {
    switch (colorType) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          icon: 'text-blue-600',
          border: 'border-blue-200'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          icon: 'text-green-600',
          border: 'border-green-200'
        };
      case 'amber':
        return {
          bg: 'bg-amber-50',
          icon: 'text-amber-600',
          border: 'border-amber-200'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          icon: 'text-purple-600',
          border: 'border-purple-200'
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'text-gray-600',
          border: 'border-gray-200'
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1 micro-interaction">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-foreground">{value}</h3>
            {trend && (
              <div className={`flex items-center text-xs ${
                trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                <Icon 
                  name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                  size={12} 
                  className="mr-1" 
                />
                {trendValue}
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses?.bg} ${colorClasses?.border} border flex items-center justify-center`}>
          <Icon name={icon} size={24} className={colorClasses?.icon} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;