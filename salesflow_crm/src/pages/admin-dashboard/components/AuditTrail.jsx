import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditTrail = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [dateRange, setDateRange] = useState('today');

  const auditLogs = [
    {
      id: 1,
      timestamp: "2025-01-09 12:15:30",
      user: "John Smith",
      userRole: "Sales Manager",
      action: "User Created",
      target: "Sarah Johnson",
      details: "Created new Sales Rep user account",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0",
      status: "Success"
    },
    {
      id: 2,
      timestamp: "2025-01-09 11:45:22",
      user: "Alex Rodriguez",
      userRole: "Admin",
      action: "Role Updated",
      target: "Mike Chen",
      details: "Changed role from Sales Rep to Sales Manager",
      ipAddress: "192.168.1.105",
      userAgent: "Firefox 121.0.0.0",
      status: "Success"
    },
    {
      id: 3,
      timestamp: "2025-01-09 10:30:15",
      user: "Emily Davis",
      userRole: "Sales Rep",
      action: "Login Failed",
      target: "emily.davis@salesflow.com",
      details: "Invalid password attempt",
      ipAddress: "192.168.1.110",
      userAgent: "Safari 17.2.1",
      status: "Failed"
    },
    {
      id: 4,
      timestamp: "2025-01-09 09:20:45",
      user: "System",
      userRole: "System",
      action: "Backup Completed",
      target: "Database",
      details: "Automated daily backup completed successfully",
      ipAddress: "127.0.0.1",
      userAgent: "System Process",
      status: "Success"
    },
    {
      id: 5,
      timestamp: "2025-01-09 08:15:30",
      user: "Lisa Wang",
      userRole: "Sales Rep",
      action: "Lead Created",
      target: "Acme Corporation",
      details: "Created new lead with contact information",
      ipAddress: "192.168.1.115",
      userAgent: "Chrome 120.0.0.0",
      status: "Success"
    },
    {
      id: 6,
      timestamp: "2025-01-08 16:45:20",
      user: "Mike Chen",
      userRole: "Sales Manager",
      action: "Opportunity Updated",
      target: "Tech Solutions Deal",
      details: "Updated opportunity stage from Proposal to Won",
      ipAddress: "192.168.1.120",
      userAgent: "Edge 120.0.0.0",
      status: "Success"
    },
    {
      id: 7,
      timestamp: "2025-01-08 15:30:10",
      user: "Alex Rodriguez",
      userRole: "Admin",
      action: "Settings Updated",
      target: "Security Settings",
      details: "Updated password policy requirements",
      ipAddress: "192.168.1.105",
      userAgent: "Firefox 121.0.0.0",
      status: "Success"
    },
    {
      id: 8,
      timestamp: "2025-01-08 14:20:55",
      user: "Unknown User",
      userRole: "Unknown",
      action: "Login Failed",
      target: "admin@salesflow.com",
      details: "Multiple failed login attempts detected",
      ipAddress: "203.0.113.45",
      userAgent: "Unknown",
      status: "Blocked"
    }
  ];

  const actionOptions = [
    { value: '', label: 'All Actions' },
    { value: 'User Created', label: 'User Created' },
    { value: 'User Updated', label: 'User Updated' },
    { value: 'Role Updated', label: 'Role Updated' },
    { value: 'Login Failed', label: 'Login Failed' },
    { value: 'Settings Updated', label: 'Settings Updated' },
    { value: 'Lead Created', label: 'Lead Created' },
    { value: 'Opportunity Updated', label: 'Opportunity Updated' }
  ];

  const userOptions = [
    { value: '', label: 'All Users' },
    { value: 'John Smith', label: 'John Smith' },
    { value: 'Alex Rodriguez', label: 'Alex Rodriguez' },
    { value: 'Emily Davis', label: 'Emily Davis' },
    { value: 'Mike Chen', label: 'Mike Chen' },
    { value: 'Lisa Wang', label: 'Lisa Wang' },
    { value: 'System', label: 'System' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const filteredLogs = auditLogs?.filter(log => {
    const matchesSearch = log?.user?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.action?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.target?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         log?.details?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesAction = !selectedAction || log?.action === selectedAction;
    const matchesUser = !selectedUser || log?.user === selectedUser;
    
    return matchesSearch && matchesAction && matchesUser;
  });

  const getActionIcon = (action) => {
    switch (action) {
      case 'User Created':
        return 'UserPlus';
      case 'User Updated': case'Role Updated':
        return 'UserCog';
      case 'Login Failed':
        return 'AlertTriangle';
      case 'Settings Updated':
        return 'Settings';
      case 'Lead Created':
        return 'UserCheck';
      case 'Opportunity Updated':
        return 'Target';
      case 'Backup Completed':
        return 'Download';
      default:
        return 'Activity';
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Success':
        return `${baseClasses} bg-success/10 text-success`;
      case 'Failed':
        return `${baseClasses} bg-destructive/10 text-destructive`;
      case 'Blocked':
        return `${baseClasses} bg-warning/10 text-warning`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  const getRoleBadge = (role) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    switch (role) {
      case 'Admin':
        return `${baseClasses} bg-red-100 text-red-700`;
      case 'Sales Manager':
        return `${baseClasses} bg-blue-100 text-blue-700`;
      case 'Sales Rep':
        return `${baseClasses} bg-green-100 text-green-700`;
      case 'System':
        return `${baseClasses} bg-gray-100 text-gray-700`;
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Input
            type="search"
            placeholder="Search audit logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full sm:w-64"
          />
          <Select
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
            placeholder="Filter by action"
            className="w-full sm:w-40"
          />
          <Select
            options={userOptions}
            value={selectedUser}
            onChange={setSelectedUser}
            placeholder="Filter by user"
            className="w-full sm:w-40"
          />
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            className="w-full sm:w-32"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
      {/* Audit Logs Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden elevation-1">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Timestamp</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Action</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Target</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">IP Address</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLogs?.map((log) => (
                <tr key={log?.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm text-foreground">{log?.timestamp}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{log?.user}</p>
                        <span className={getRoleBadge(log?.userRole)}>
                          {log?.userRole}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={getActionIcon(log?.action)} size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{log?.action}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{log?.target}</p>
                      <p className="text-xs text-muted-foreground">{log?.details}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={getStatusBadge(log?.status)}>
                      {log?.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-foreground">{log?.ipAddress}</p>
                    <p className="text-xs text-muted-foreground">{log?.userAgent}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Icon name="MoreHorizontal" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredLogs?.length} of {auditLogs?.length} audit logs
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;