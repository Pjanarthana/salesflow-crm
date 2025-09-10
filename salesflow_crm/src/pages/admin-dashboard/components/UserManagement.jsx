import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@salesflow.com",
      role: "Sales Manager",
      status: "Active",
      lastLogin: "2025-01-09 10:30 AM",
      department: "Sales",
      joinDate: "2024-03-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@salesflow.com",
      role: "Sales Rep",
      status: "Active",
      lastLogin: "2025-01-09 11:45 AM",
      department: "Sales",
      joinDate: "2024-06-20"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@salesflow.com",
      role: "Sales Manager",
      status: "Active",
      lastLogin: "2025-01-09 09:15 AM",
      department: "Sales",
      joinDate: "2024-01-10"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@salesflow.com",
      role: "Sales Rep",
      status: "Inactive",
      lastLogin: "2025-01-08 04:20 PM",
      department: "Sales",
      joinDate: "2024-08-05"
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      email: "alex.rodriguez@salesflow.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2025-01-09 08:00 AM",
      department: "IT",
      joinDate: "2023-11-12"
    },
    {
      id: 6,
      name: "Lisa Wang",
      email: "lisa.wang@salesflow.com",
      role: "Sales Rep",
      status: "Active",
      lastLogin: "2025-01-09 12:10 PM",
      department: "Sales",
      joinDate: "2024-09-18"
    }
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Sales Rep', label: 'Sales Rep' },
    { value: 'Sales Manager', label: 'Sales Manager' },
    { value: 'Admin', label: 'Administrator' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = !selectedRole || user?.role === selectedRole;
    const matchesStatus = !selectedStatus || user?.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers?.length === filteredUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'Active') {
      return `${baseClasses} bg-success/10 text-success`;
    }
    return `${baseClasses} bg-muted text-muted-foreground`;
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
      default:
        return `${baseClasses} bg-muted text-muted-foreground`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full sm:w-64"
          />
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
            placeholder="Filter by role"
            className="w-full sm:w-40"
          />
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Filter by status"
            className="w-full sm:w-40"
          />
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="Upload"
            iconPosition="left"
            size="sm"
          >
            Import Users
          </Button>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            size="sm"
            onClick={() => setShowAddUserModal(true)}
          >
            Add User
          </Button>
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="UserCheck">
                Activate
              </Button>
              <Button variant="outline" size="sm" iconName="UserX">
                Deactivate
              </Button>
              <Button variant="outline" size="sm" iconName="UserCog">
                Change Role
              </Button>
              <Button variant="destructive" size="sm" iconName="Trash2">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden elevation-1">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="w-12 px-4 py-3 text-left">
                  <Checkbox
                    checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Last Login</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Department</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={() => handleSelectUser(user?.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={getRoleBadge(user?.role)}>
                      {user?.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={getStatusBadge(user?.status)}>
                      {user?.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-foreground">{user?.lastLogin}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-foreground">{user?.department}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Icon name="Edit" size={16} />
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
          Showing {filteredUsers?.length} of {users?.length} users
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
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;