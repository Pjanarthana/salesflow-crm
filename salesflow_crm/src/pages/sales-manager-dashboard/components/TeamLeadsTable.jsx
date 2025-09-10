import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const TeamLeadsTable = () => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterRep, setFilterRep] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState([]);

  const teamLeads = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      status: "New",
      assignedRep: "Sarah Johnson",
      repId: 1,
      createdAt: new Date('2025-01-08'),
      lastActivity: new Date('2025-01-09'),
      source: "Website"
    },
    {
      id: 2,
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+1 (555) 234-5678",
      status: "Contacted",
      assignedRep: "Michael Chen",
      repId: 2,
      createdAt: new Date('2025-01-07'),
      lastActivity: new Date('2025-01-09'),
      source: "Referral"
    },
    {
      id: 3,
      name: "Robert Wilson",
      email: "robert.wilson@email.com",
      phone: "+1 (555) 345-6789",
      status: "Qualified",
      assignedRep: "Emily Rodriguez",
      repId: 3,
      createdAt: new Date('2025-01-06'),
      lastActivity: new Date('2025-01-08'),
      source: "Cold Call"
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+1 (555) 456-7890",
      status: "New",
      assignedRep: "David Park",
      repId: 4,
      createdAt: new Date('2025-01-09'),
      lastActivity: new Date('2025-01-09'),
      source: "LinkedIn"
    },
    {
      id: 5,
      name: "James Brown",
      email: "james.brown@email.com",
      phone: "+1 (555) 567-8901",
      status: "Contacted",
      assignedRep: "Sarah Johnson",
      repId: 1,
      createdAt: new Date('2025-01-05'),
      lastActivity: new Date('2025-01-07'),
      source: "Website"
    }
  ];

  const repOptions = [
    { value: '', label: 'All Representatives' },
    { value: '1', label: 'Sarah Johnson' },
    { value: '2', label: 'Michael Chen' },
    { value: '3', label: 'Emily Rodriguez' },
    { value: '4', label: 'David Park' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Qualified', label: 'Qualified' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Qualified':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectLead = (leadId) => {
    setSelectedLeads(prev => 
      prev?.includes(leadId) 
        ? prev?.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads?.length === teamLeads?.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(teamLeads?.map(lead => lead?.id));
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredLeads = teamLeads?.filter(lead => {
    const matchesSearch = lead?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         lead?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRep = !filterRep || lead?.repId?.toString() === filterRep;
    const matchesStatus = !filterStatus || lead?.status === filterStatus;
    
    return matchesSearch && matchesRep && matchesStatus;
  });

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Team Leads</h3>
            <p className="text-sm text-muted-foreground">Manage all team leads across representatives</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export
            </Button>
            <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
              Add Lead
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search leads..."
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
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Filter by status"
          />
          <Button variant="outline" size="default" iconName="Filter" iconPosition="left">
            More Filters
          </Button>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedLeads?.length > 0 && (
        <div className="px-6 py-3 bg-muted/30 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {selectedLeads?.length} lead{selectedLeads?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="UserCheck" iconPosition="left">
                Reassign
              </Button>
              <Button variant="outline" size="sm" iconName="Mail" iconPosition="left">
                Bulk Email
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
                  checked={selectedLeads?.length === teamLeads?.length}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Lead Name</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Contact Info</th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
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
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Created</span>
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
            {filteredLeads?.map((lead) => (
              <tr key={lead?.id} className="border-t border-border hover:bg-muted/20">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedLeads?.includes(lead?.id)}
                    onChange={() => handleSelectLead(lead?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{lead?.name}</p>
                    <p className="text-sm text-muted-foreground">{lead?.source}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-sm text-foreground">{lead?.email}</p>
                    <p className="text-sm text-muted-foreground">{lead?.phone}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead?.status)}`}>
                    {lead?.status}
                  </span>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{lead?.assignedRep}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{formatDate(lead?.createdAt)}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{formatDate(lead?.lastActivity)}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Edit" />
                    <Button variant="ghost" size="sm" iconName="ArrowRight" />
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
            Showing {filteredLeads?.length} of {teamLeads?.length} leads
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

export default TeamLeadsTable;