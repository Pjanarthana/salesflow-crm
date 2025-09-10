import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const OpportunitiesTable = ({ opportunities, onEdit, onDelete, onStageUpdate }) => {
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');

  const stageOptions = [
    { value: 'Discovery', label: 'Discovery' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' }
  ];

  const getStageBadge = (stage) => {
    const stageConfig = {
      'Discovery': { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
      'Proposal': { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
      'Won': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
      'Lost': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' }
    };
    
    const config = stageConfig?.[stage] || stageConfig?.['Discovery'];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config?.dot} mr-1.5`}></span>
        {stage}
      </span>
    );
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(value);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOpportunities = [...opportunities]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleStageChange = (opportunityId, newStage) => {
    onStageUpdate(opportunityId, newStage);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground"
                >
                  <span>Title</span>
                  <Icon 
                    name={sortField === 'title' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={12} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('value')}
                  className="flex items-center space-x-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground"
                >
                  <span>Value</span>
                  <Icon 
                    name={sortField === 'value' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={12} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('stage')}
                  className="flex items-center space-x-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground"
                >
                  <span>Stage</span>
                  <Icon 
                    name={sortField === 'stage' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={12} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Created</span>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedOpportunities?.map((opportunity) => (
              <tr key={opportunity?.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mr-3">
                      <Icon name="Target" size={16} className="text-success" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{opportunity?.title}</div>
                      <div className="text-xs text-muted-foreground">Opp #{opportunity?.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-foreground">{formatCurrency(opportunity?.value)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-32">
                    <Select
                      options={stageOptions}
                      value={opportunity?.stage}
                      onChange={(newStage) => handleStageChange(opportunity?.id, newStage)}
                      className="text-xs"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-muted-foreground">{opportunity?.createdDate}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Edit"
                      onClick={() => onEdit(opportunity)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Trash2"
                      onClick={() => onDelete(opportunity)}
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
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="Target" size={18} className="text-success" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{opportunity?.title}</h4>
                  <p className="text-xs text-muted-foreground">Opp #{opportunity?.id}</p>
                </div>
              </div>
              {getStageBadge(opportunity?.stage)}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Value:</span>
                <span className="text-sm font-semibold text-foreground">{formatCurrency(opportunity?.value)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="text-sm text-foreground">{opportunity?.createdDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="w-28">
                <Select
                  options={stageOptions}
                  value={opportunity?.stage}
                  onChange={(newStage) => handleStageChange(opportunity?.id, newStage)}
                />
              </div>
              <div className="flex items-center space-x-2">
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
                  onClick={() => onDelete(opportunity)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {sortedOpportunities?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Target" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No opportunities found</h3>
          <p className="text-muted-foreground">Convert leads or create new opportunities to start tracking your deals.</p>
        </div>
      )}
    </div>
  );
};

export default OpportunitiesTable;