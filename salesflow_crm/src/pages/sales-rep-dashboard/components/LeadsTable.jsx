import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const LeadsTable = ({ leads, onEdit, onDelete, onConvert, onStatusUpdate }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const statusOptions = [
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'New': { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
      'Contacted': { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500' },
      'Qualified': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.['New'];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config?.dot} mr-1.5`}></span>
        {status}
      </span>
    );
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedLeads = [...leads]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleStatusChange = (leadId, newStatus) => {
    onStatusUpdate(leadId, newStatus);
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
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground"
                >
                  <span>Name</span>
                  <Icon 
                    name={sortField === 'name' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={12} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center space-x-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground"
                >
                  <span>Email</span>
                  <Icon 
                    name={sortField === 'email' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={12} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</span>
              </th>
              <th className="px-6 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-foreground"
                >
                  <span>Status</span>
                  <Icon 
                    name={sortField === 'status' && sortDirection === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                    size={12} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedLeads?.map((lead) => (
              <tr key={lead?.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{lead?.name}</div>
                      <div className="text-xs text-muted-foreground">Lead #{lead?.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">{lead?.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">{lead?.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-32">
                    <Select
                      options={statusOptions}
                      value={lead?.status}
                      onChange={(newStatus) => handleStatusChange(lead?.id, newStatus)}
                      className="text-xs"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {lead?.status !== 'Qualified' && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="ArrowRight"
                        iconPosition="right"
                        onClick={() => onConvert(lead)}
                      >
                        Convert
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Edit"
                      onClick={() => onEdit(lead)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Trash2"
                      onClick={() => onDelete(lead)}
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
        {sortedLeads?.map((lead) => (
          <div key={lead?.id} className="bg-muted/20 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={18} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{lead?.name}</h4>
                  <p className="text-xs text-muted-foreground">Lead #{lead?.id}</p>
                </div>
              </div>
              {getStatusBadge(lead?.status)}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{lead?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{lead?.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="w-24">
                <Select
                  options={statusOptions}
                  value={lead?.status}
                  onChange={(newStatus) => handleStatusChange(lead?.id, newStatus)}
                />
              </div>
              <div className="flex items-center space-x-2">
                {lead?.status !== 'Qualified' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={() => onConvert(lead)}
                  >
                    Convert
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onEdit(lead)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onDelete(lead)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {sortedLeads?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No leads found</h3>
          <p className="text-muted-foreground">Start by adding your first lead to begin tracking your pipeline.</p>
        </div>
      )}
    </div>
  );
};

export default LeadsTable;