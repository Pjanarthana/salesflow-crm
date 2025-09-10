import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OpportunityFilters = ({ 
  onFilterChange, 
  userRole = 'Sales Rep',
  totalValue = 0,
  stageDistribution = {},
  className = '' 
}) => {
  const [filters, setFilters] = useState({
    search: '',
    stage: '',
    valueRange: [0, 1000000],
    dateRange: '',
    assignedRep: ''
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const stageOptions = [
    { value: '', label: 'All Stages' },
    { value: 'Discovery', label: 'Discovery' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const repOptions = [
    { value: '', label: 'All Reps' },
    { value: 'john-doe', label: 'John Doe' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'emily-davis', label: 'Emily Davis' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      stage: '',
      valueRange: [0, 1000000],
      dateRange: '',
      assignedRep: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Pipeline Summary */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Pipeline Overview</h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{formatCurrency(totalValue)}</p>
            <p className="text-sm text-muted-foreground">Total Pipeline Value</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stageDistribution)?.map(([stage, count]) => (
            <div key={stage} className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-lg font-semibold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground">{stage}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Search and Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        <div className="md:col-span-2">
          <Input
            type="search"
            placeholder="Search opportunities by title..."
            value={filters?.search}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <Select
          placeholder="Filter by stage"
          options={stageOptions}
          value={filters?.stage}
          onChange={(value) => handleFilterChange('stage', value)}
        />

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            Advanced
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={clearAllFilters}
            disabled={!filters?.search && !filters?.stage && !filters?.dateRange && !filters?.assignedRep}
          >
            Clear
          </Button>
        </div>
      </div>
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t border-border pt-4 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Value Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Value Range
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters?.valueRange?.[0]}
                    onChange={(e) => handleFilterChange('valueRange', [parseInt(e?.target?.value) || 0, filters?.valueRange?.[1]])}
                    className="flex-1"
                  />
                  <span className="text-muted-foreground">to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters?.valueRange?.[1]}
                    onChange={(e) => handleFilterChange('valueRange', [filters?.valueRange?.[0], parseInt(e?.target?.value) || 1000000])}
                    className="flex-1"
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatCurrency(filters?.valueRange?.[0])} - {formatCurrency(filters?.valueRange?.[1])}
                </div>
              </div>
            </div>

            {/* Date Range */}
            <Select
              label="Date Range"
              placeholder="Select date range"
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />

            {/* Assigned Rep (for managers only) */}
            {(userRole === 'Sales Manager' || userRole === 'Admin') && (
              <Select
                label="Assigned Rep"
                placeholder="Select sales rep"
                options={repOptions}
                value={filters?.assignedRep}
                onChange={(value) => handleFilterChange('assignedRep', value)}
              />
            )}
          </div>

          {/* Saved Filters */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Bookmark" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Saved Filters:</span>
              </div>
              <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
                Save Current
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button variant="outline" size="sm">High Value Deals</Button>
              <Button variant="outline" size="sm">This Quarter</Button>
              <Button variant="outline" size="sm">Won Opportunities</Button>
            </div>
          </div>
        </div>
      )}
      {/* Export Options */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing opportunities based on current filters
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export CSV
          </Button>
          <Button variant="outline" size="sm" iconName="FileText" iconPosition="left">
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityFilters;