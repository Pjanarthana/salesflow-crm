import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const OpportunityTable = ({ 
  opportunities = [], 
  userRole = 'Sales Rep',
  onEdit,
  onDelete,
  onStageUpdate,
  onBulkStageUpdate,
  className = '' 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const stageOptions = [
    { value: 'Discovery', label: 'Discovery' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' }
  ];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedOpportunities = () => {
    const sortedData = [...opportunities];
    if (sortConfig?.key) {
      sortedData?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (sortConfig?.key === 'value') {
          aValue = parseFloat(aValue) || 0;
          bValue = parseFloat(bValue) || 0;
        } else if (sortConfig?.key === 'createdAt') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else {
          aValue = aValue?.toString()?.toLowerCase() || '';
          bValue = bValue?.toString()?.toLowerCase() || '';
        }

        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortedData;
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOpportunities(opportunities?.map(opp => opp?.id));
    } else {
      setSelectedOpportunities([]);
    }
  };

  const handleSelectOpportunity = (opportunityId, checked) => {
    if (checked) {
      setSelectedOpportunities([...selectedOpportunities, opportunityId]);
    } else {
      setSelectedOpportunities(selectedOpportunities?.filter(id => id !== opportunityId));
    }
  };

  const handleBulkStageUpdate = (newStage) => {
    onBulkStageUpdate(selectedOpportunities, newStage);
    setSelectedOpportunities([]);
    setShowBulkActions(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Discovery': return 'bg-blue-100 text-blue-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'Won': return 'bg-green-100 text-green-800';
      case 'Lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const sortedOpportunities = getSortedOpportunities();

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Bulk Actions Bar */}
      {selectedOpportunities?.length > 0 && (
        <div className="bg-primary/5 border-b border-border p-4 animate-slide-down">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-foreground">
                {selectedOpportunities?.length} opportunities selected
              </span>
              <div className="flex items-center space-x-2">
                <Select
                  placeholder="Update stage"
                  options={stageOptions}
                  onChange={handleBulkStageUpdate}
                  className="w-40"
                />
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onDelete(selectedOpportunities)}
                >
                  Delete Selected
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => setSelectedOpportunities([])}
            />
          </div>
        </div>
      )}
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedOpportunities?.length === opportunities?.length && opportunities?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Title</span>
                  <Icon name={getSortIcon('title')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('value')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Value</span>
                  <Icon name={getSortIcon('value')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('stage')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Stage</span>
                  <Icon name={getSortIcon('stage')} size={14} />
                </button>
              </th>
              {(userRole === 'Sales Manager' || userRole === 'Admin') && (
                <th className="text-left p-4">
                  <button
                    onClick={() => handleSort('assignedRep')}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>Assigned Rep</span>
                    <Icon name={getSortIcon('assignedRep')} size={14} />
                  </button>
                </th>
              )}
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Created</span>
                  <Icon name={getSortIcon('createdAt')} size={14} />
                </button>
              </th>
              <th className="w-24 p-4 text-center">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedOpportunities?.map((opportunity) => (
              <tr key={opportunity?.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="p-4">
                  <Checkbox
                    checked={selectedOpportunities?.includes(opportunity?.id)}
                    onChange={(e) => handleSelectOpportunity(opportunity?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{opportunity?.title}</p>
                    {opportunity?.description && (
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {opportunity?.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-semibold text-foreground">
                    {formatCurrency(opportunity?.value)}
                  </span>
                </td>
                <td className="p-4">
                  <Select
                    value={opportunity?.stage}
                    options={stageOptions}
                    onChange={(newStage) => onStageUpdate(opportunity?.id, newStage)}
                    className="w-32"
                  />
                </td>
                {(userRole === 'Sales Manager' || userRole === 'Admin') && (
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} color="var(--color-primary)" />
                      </div>
                      <span className="text-sm text-foreground">{opportunity?.assignedRep}</span>
                    </div>
                  </td>
                )}
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(opportunity?.createdAt)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEdit(opportunity)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => onDelete([opportunity?.id])}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {sortedOpportunities?.map((opportunity) => (
          <div key={opportunity?.id} className="bg-muted/20 rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{opportunity?.title}</h3>
                <p className="text-lg font-semibold text-primary mt-1">
                  {formatCurrency(opportunity?.value)}
                </p>
              </div>
              <Checkbox
                checked={selectedOpportunities?.includes(opportunity?.id)}
                onChange={(e) => handleSelectOpportunity(opportunity?.id, e?.target?.checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Select
                value={opportunity?.stage}
                options={stageOptions}
                onChange={(newStage) => onStageUpdate(opportunity?.id, newStage)}
                className="flex-1 mr-2"
              />
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onEdit(opportunity)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onDelete([opportunity?.id])}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {(userRole === 'Sales Manager' || userRole === 'Admin') && (
                <span>{opportunity?.assignedRep}</span>
              )}
              <span>{formatDate(opportunity?.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {opportunities?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Target" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No opportunities found</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first opportunity or adjust your filters.
          </p>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Add Opportunity
          </Button>
        </div>
      )}
    </div>
  );
};

export default OpportunityTable;