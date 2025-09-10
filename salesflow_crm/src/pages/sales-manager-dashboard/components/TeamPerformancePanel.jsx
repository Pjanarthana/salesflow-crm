import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const TeamPerformancePanel = () => {
  const [selectedRep, setSelectedRep] = useState('all');

  const teamPerformance = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      role: "Senior Sales Rep",
      leadsCount: 45,
      opportunitiesCount: 12,
      conversionRate: 26.7,
      pipelineValue: 125000,
      lastActivity: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      role: "Sales Rep",
      leadsCount: 38,
      opportunitiesCount: 8,
      conversionRate: 21.1,
      pipelineValue: 89000,
      lastActivity: "1 hour ago",
      status: "active"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      role: "Sales Rep",
      leadsCount: 52,
      opportunitiesCount: 15,
      conversionRate: 28.8,
      pipelineValue: 156000,
      lastActivity: "30 min ago",
      status: "active"
    },
    {
      id: 4,
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      role: "Junior Sales Rep",
      leadsCount: 29,
      opportunitiesCount: 6,
      conversionRate: 20.7,
      pipelineValue: 67000,
      lastActivity: "4 hours ago",
      status: "away"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'away':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Team Performance</h3>
            <p className="text-sm text-muted-foreground">Individual rep statistics and metrics</p>
          </div>
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export Report
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {teamPerformance?.map((rep) => (
            <div 
              key={rep?.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => setSelectedRep(rep?.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={rep?.avatar}
                    alt={rep?.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(rep?.status)} rounded-full border-2 border-card`}></div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{rep?.name}</h4>
                  <p className="text-sm text-muted-foreground">{rep?.role}</p>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{rep?.leadsCount}</p>
                  <p className="text-xs text-muted-foreground">Leads</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{rep?.opportunitiesCount}</p>
                  <p className="text-xs text-muted-foreground">Opportunities</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-success">{rep?.conversionRate}%</p>
                  <p className="text-xs text-muted-foreground">Conversion</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary">{formatCurrency(rep?.pipelineValue)}</p>
                  <p className="text-xs text-muted-foreground">Pipeline Value</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">{rep?.lastActivity}</p>
                  <p className="text-xs text-muted-foreground">Last Activity</p>
                </div>
                <Button variant="ghost" size="sm" iconName="ChevronRight" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">164</p>
              <p className="text-sm text-muted-foreground">Total Leads</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">41</p>
              <p className="text-sm text-muted-foreground">Total Opportunities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">25.0%</p>
              <p className="text-sm text-muted-foreground">Avg Conversion</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{formatCurrency(437000)}</p>
              <p className="text-sm text-muted-foreground">Total Pipeline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformancePanel;