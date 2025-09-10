import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const TeamOpportunitiesTable = () => {
  const [sortField, setSortField] = useState('value');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterRep, setFilterRep] = useState('');
  const [filterStage, setFilterStage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);

  const teamOpportunities = [
    {
      id: 1,
      title: "Enterprise Software License",
      value: 75000,
      stage: "Proposal",
      assignedRep: "Sarah Johnson",
      repId: 1,
      createdAt: new Date('2025-01-05'),
      lastActivity: new Date('2025-01-09'),
      closeDate: new Date('2025-01-15'),
      probability: 80
    },
    {
      id: 2,
      title: "Cloud Migration Project",
      value: 120000,
      stage: "Discovery",
      assignedRep: "Michael Chen",
      repId: 2,
      createdAt: new Date('2025-01-03'),
      lastActivity: new Date('2025-01-08'),
      closeDate: new Date('2025-01-20'),
      probability: 60
    },
    {
      id: 3,
      title: "Security Audit Services",
      value: 45000,
      stage: "Won",
      assignedRep: "Emily Rodriguez",
      repId: 3,
      createdAt: new Date('2024-12-28'),
      lastActivity: new Date('2025-01-07'),
      closeDate: new Date('2025-01-10'),
      probability: 100
    },
    {
      id: 4,
      title: "Training & Consulting",
      value: 32000,
      stage: "Discovery",
      assignedRep: "David Park",
      repId: 4,
      createdAt: new Date('2025-01-06'),
      lastActivity: new Date('2025-01-09'),
      closeDate: new Date('2025-01-25'),
      probability: 40
    },
    {
      id: 5,
      title: "Annual Support Contract",
      value: 89000,
      stage: "Proposal",
      assignedRep: "Sarah Johnson",
      repId: 1,
      createdAt: new Date('2025-01-02'),
      lastActivity: new Date('2025-01-08'),
      closeDate: new Date('2025-01-18'),
      probability: 75
    }
  ];

  const repOptions = [
    { value: '', label: 'All Representatives' },
    { value: '1', label: 'Sarah Johnson' },
    { value: '2', label: 'Michael Chen' },
    { value: '3', label: 'Emily Rodriguez' },
    { value: '4', label: 'David Park' }
  ];

  const stageOptions = [
    { value: '', label: 'All Stages' },
    { value: 'Discovery', label: 'Discovery' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' }
  ];

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Discovery':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Proposal':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Won':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Lost':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    if (probability >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectOpportunity = (opportunityId) => {
    setSelectedOpportunities(prev => 
      prev?.includes(opportunityId) 
        ? prev?.filter(id => id !== opportunityId)
        : [...prev, opportunityId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOpportunities?.length === teamOpportunities?.length) {
      setSelectedOpportunities([]);
    } else {
      setSelectedOpportunities(teamOpportunities?.map(opp => opp?.id));
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

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredOpportunities = teamOpportunities?.filter(opp => {
    const matchesSearch = opp?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRep = !filterRep || opp?.repId?.toString() === filterRep;
    const matchesStage = !filterStage || opp?.stage === filterStage;
    
    return matchesSearch && matchesRep && matchesStage;
  });

  const handleStageUpdate = (opportunityId, newStage) => {
    // In a real app, this would make an API call
    console.log(`Updating opportunity ${opportunityId} to stage ${newStage}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Team Opportunities</h3>
            <p className="text-sm text-muted-foreground">Manage all team opportunities and pipeline</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export
            </Button>
            <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
              Add Opportunity
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
          <Select
            options={repOptions}
            value={filterRep}
            onChange={setFilterRep}
            placeholder="Filter by rep"
          />
          <Select
            options={stageOptions}
            value={filterStage}
            onChange={setFilterStage}
            placeholder="Filter by stage"
          />
          <Button variant="outline" size="default" iconName="Filter" iconPosition="left">
            More Filters
          </Button>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedOpportunities?.length > 0 && (
        <div className="px-6 py-3 bg-muted/30 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedOpportunities?.length} opportunit{selectedOpportunities?.length > 1 ? 'ies' : 'y'} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="UserCheck" iconPosition="left">
                Reassign
              </Button>
              <Button variant="outline" size="sm" iconName="ArrowUp" iconPosition="left">
                Bulk Stage Update
              </Button>
              <Button variant="destructive" size="sm" iconName="Trash2" iconPosition="left">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedOpportunities?.length === teamOpportunities?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Opportunity</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('value')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Value</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('stage')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Stage</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Probability</th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('assignedRep')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Assigned Rep</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('closeDate')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Close Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Last Activity</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOpportunities?.map((opportunity) => (
              <tr key={opportunity?.id} className="border-t border-border hover:bg-muted/20">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedOpportunities?.includes(opportunity?.id)}
                    onChange={() => handleSelectOpportunity(opportunity?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{opportunity?.title}</p>
                    <p className="text-sm text-muted-foreground">ID: #{opportunity?.id}</p>
                  </div>
                </td>
                <td className="p-4">
                  <p className="font-semibold text-foreground">{formatCurrency(opportunity?.value)}</p>
                </td>
                <td className="p-4">
                  <Select
                    options={stageOptions?.slice(1)}
                    value={opportunity?.stage}
                    onChange={(newStage) => handleStageUpdate(opportunity?.id, newStage)}
                    className="w-32"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProbabilityColor(opportunity?.probability)?.replace('text-', 'bg-')}`}
                        style={{ width: `${opportunity?.probability}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getProbabilityColor(opportunity?.probability)}`}>
                      {opportunity?.probability}%
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{opportunity?.assignedRep}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{formatDate(opportunity?.closeDate)}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{formatDate(opportunity?.lastActivity)}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit" />
                    <Button variant="ghost" size="sm" iconName="Eye" />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredOpportunities?.length} of {teamOpportunities?.length} opportunities
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="ChevronLeft" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" iconName="ChevronRight" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamOpportunitiesTable;