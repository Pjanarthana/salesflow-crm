import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const RoleConfiguration = () => {
  const [selectedRole, setSelectedRole] = useState('Sales Rep');

  const roles = [
    {
      id: 'sales-rep',
      name: 'Sales Rep',
      description: 'Individual contributors who manage their own leads and opportunities',
      userCount: 156,
      color: 'bg-green-500'
    },
    {
      id: 'sales-manager',
      name: 'Sales Manager',
      description: 'Team leaders with visibility across multiple sales representatives',
      userCount: 23,
      color: 'bg-blue-500'
    },
    {
      id: 'admin',
      name: 'Administrator',
      description: 'System administrators with full access to user management and configuration',
      userCount: 8,
      color: 'bg-red-500'
    }
  ];

  const permissions = [
    {
      category: 'Lead Management',
      permissions: [
        { id: 'leads.view', name: 'View Leads', description: 'Access to view lead information' },
        { id: 'leads.create', name: 'Create Leads', description: 'Ability to add new leads' },
        { id: 'leads.edit', name: 'Edit Leads', description: 'Modify existing lead information' },
        { id: 'leads.delete', name: 'Delete Leads', description: 'Remove leads from the system' },
        { id: 'leads.convert', name: 'Convert Leads', description: 'Convert leads to opportunities' }
      ]
    },
    {
      category: 'Opportunity Management',
      permissions: [
        { id: 'opportunities.view', name: 'View Opportunities', description: 'Access to view opportunity information' },
        { id: 'opportunities.create', name: 'Create Opportunities', description: 'Ability to add new opportunities' },
        { id: 'opportunities.edit', name: 'Edit Opportunities', description: 'Modify existing opportunity information' },
        { id: 'opportunities.delete', name: 'Delete Opportunities', description: 'Remove opportunities from the system' },
        { id: 'opportunities.stage', name: 'Update Stages', description: 'Change opportunity stages' }
      ]
    },
    {
      category: 'Team Management',
      permissions: [
        { id: 'team.view', name: 'View Team Data', description: 'Access to team performance metrics' },
        { id: 'team.manage', name: 'Manage Team', description: 'Assign and manage team members' },
        { id: 'team.reports', name: 'Generate Reports', description: 'Create team performance reports' }
      ]
    },
    {
      category: 'User Administration',
      permissions: [
        { id: 'users.view', name: 'View Users', description: 'Access to user directory' },
        { id: 'users.create', name: 'Create Users', description: 'Add new system users' },
        { id: 'users.edit', name: 'Edit Users', description: 'Modify user information and roles' },
        { id: 'users.delete', name: 'Delete Users', description: 'Remove users from the system' },
        { id: 'users.roles', name: 'Manage Roles', description: 'Assign and modify user roles' }
      ]
    },
    {
      category: 'System Configuration',
      permissions: [
        { id: 'system.settings', name: 'System Settings', description: 'Access to system configuration' },
        { id: 'system.security', name: 'Security Settings', description: 'Manage security parameters' },
        { id: 'system.integrations', name: 'Integrations', description: 'Configure external integrations' },
        { id: 'system.audit', name: 'Audit Logs', description: 'Access to system audit trails' }
      ]
    }
  ];

  const rolePermissions = {
    'Sales Rep': [
      'leads.view', 'leads.create', 'leads.edit', 'leads.convert',
      'opportunities.view', 'opportunities.create', 'opportunities.edit', 'opportunities.stage'
    ],
    'Sales Manager': [
      'leads.view', 'leads.create', 'leads.edit', 'leads.delete', 'leads.convert',
      'opportunities.view', 'opportunities.create', 'opportunities.edit', 'opportunities.delete', 'opportunities.stage',
      'team.view', 'team.manage', 'team.reports'
    ],
    'Administrator': [
      'leads.view', 'leads.create', 'leads.edit', 'leads.delete', 'leads.convert',
      'opportunities.view', 'opportunities.create', 'opportunities.edit', 'opportunities.delete', 'opportunities.stage',
      'team.view', 'team.manage', 'team.reports',
      'users.view', 'users.create', 'users.edit', 'users.delete', 'users.roles',
      'system.settings', 'system.security', 'system.integrations', 'system.audit'
    ]
  };

  const hasPermission = (permissionId) => {
    return rolePermissions?.[selectedRole]?.includes(permissionId) || false;
  };

  const selectedRoleData = roles?.find(role => role?.name === selectedRole);

  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles?.map((role) => (
          <div
            key={role?.id}
            onClick={() => setSelectedRole(role?.name)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedRole === role?.name
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 ${role?.color} rounded-lg flex items-center justify-center`}>
                <Icon 
                  name={role?.name === 'Administrator' ? 'Shield' : role?.name === 'Sales Manager' ? 'Crown' : 'User'} 
                  size={20} 
                  color="white" 
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{role?.name}</h3>
                <p className="text-sm text-muted-foreground">{role?.userCount} users</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{role?.description}</p>
          </div>
        ))}
      </div>
      {/* Selected Role Details */}
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${selectedRoleData?.color} rounded-lg flex items-center justify-center`}>
              <Icon 
                name={selectedRole === 'Administrator' ? 'Shield' : selectedRole === 'Sales Manager' ? 'Crown' : 'User'} 
                size={24} 
                color="white" 
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{selectedRole} Permissions</h2>
              <p className="text-sm text-muted-foreground">
                Configure access levels for {selectedRoleData?.userCount} users with this role
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Reset to Default
            </Button>
            <Button variant="default" size="sm">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Permissions Grid */}
        <div className="space-y-6">
          {permissions?.map((category) => (
            <div key={category?.category} className="space-y-3">
              <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                {category?.category}
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {category?.permissions?.map((permission) => (
                  <div key={permission?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      checked={hasPermission(permission?.id)}
                      onChange={() => {}}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-foreground">{permission?.name}</p>
                        {hasPermission(permission?.id) && (
                          <Icon name="Check" size={14} className="text-success" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{permission?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Permission Summary */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Info" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Permission Summary</p>
              <p className="text-xs text-muted-foreground">
                {selectedRole} role has {rolePermissions?.[selectedRole]?.length || 0} permissions enabled
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" iconName="Download">
            Export Permissions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleConfiguration;