import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemSettings = () => {
  const [activeSection, setActiveSection] = useState('general');

  const settingSections = [
    { id: 'general', name: 'General Settings', icon: 'Settings' },
    { id: 'security', name: 'Security', icon: 'Shield' },
    { id: 'integrations', name: 'Integrations', icon: 'Zap' },
    { id: 'notifications', name: 'Notifications', icon: 'Bell' },
    { id: 'backup', name: 'Backup & Recovery', icon: 'Download' }
  ];

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'EST', label: 'EST (Eastern Standard Time)' },
    { value: 'PST', label: 'PST (Pacific Standard Time)' },
    { value: 'CST', label: 'CST (Central Standard Time)' },
    { value: 'MST', label: 'MST (Mountain Standard Time)' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="Organization Name"
          type="text"
          value="SalesFlow CRM"
          placeholder="Enter organization name"
        />
        <Input
          label="System Email"
          type="email"
          value="admin@salesflow.com"
          placeholder="Enter system email"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Select
          label="Default Timezone"
          options={timezoneOptions}
          value="EST"
          placeholder="Select timezone"
        />
        <Select
          label="Default Currency"
          options={currencyOptions}
          value="USD"
          placeholder="Select currency"
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">System Preferences</h4>
        <div className="space-y-3">
          <Checkbox
            label="Enable user registration"
            description="Allow new users to register accounts"
            checked
          />
          <Checkbox
            label="Require email verification"
            description="Users must verify their email before accessing the system"
            checked
          />
          <Checkbox
            label="Enable audit logging"
            description="Track all user actions and system changes"
            checked
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Input
          label="Session Timeout (minutes)"
          type="number"
          value="60"
          placeholder="Enter session timeout"
        />
        <Input
          label="Password Minimum Length"
          type="number"
          value="8"
          placeholder="Enter minimum password length"
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Password Requirements</h4>
        <div className="space-y-3">
          <Checkbox
            label="Require uppercase letters"
            checked
          />
          <Checkbox
            label="Require lowercase letters"
            checked
          />
          <Checkbox
            label="Require numbers"
            checked
          />
          <Checkbox
            label="Require special characters"
           
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Two-Factor Authentication</h4>
        <div className="space-y-3">
          <Checkbox
            label="Enable 2FA for all users"
            description="Require two-factor authentication for enhanced security"
           
          />
          <Checkbox
            label="Enforce 2FA for administrators"
            description="Mandatory 2FA for users with admin privileges"
            checked
          />
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {[
          { name: 'Email Service', status: 'Connected', icon: 'Mail', color: 'bg-green-500' },
          { name: 'SMS Gateway', status: 'Disconnected', icon: 'MessageSquare', color: 'bg-red-500' },
          { name: 'Calendar Sync', status: 'Connected', icon: 'Calendar', color: 'bg-green-500' },
          { name: 'Analytics', status: 'Connected', icon: 'BarChart', color: 'bg-green-500' },
          { name: 'File Storage', status: 'Connected', icon: 'Cloud', color: 'bg-green-500' },
          { name: 'Payment Gateway', status: 'Pending', icon: 'CreditCard', color: 'bg-yellow-500' }
        ]?.map((integration, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${integration?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={integration?.icon} size={20} color="white" />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                integration?.status === 'Connected' ? 'bg-success/10 text-success' :
                integration?.status === 'Pending'? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
              }`}>
                {integration?.status}
              </span>
            </div>
            <h4 className="font-medium text-foreground mb-2">{integration?.name}</h4>
            <Button variant="outline" size="sm" fullWidth>
              Configure
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Email Notifications</h4>
        <div className="space-y-3">
          <Checkbox
            label="New user registration"
            description="Notify administrators when new users register"
            checked
          />
          <Checkbox
            label="System alerts"
            description="Send critical system alerts via email"
            checked
          />
          <Checkbox
            label="Daily reports"
            description="Send daily activity reports to managers"
           
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">In-App Notifications</h4>
        <div className="space-y-3">
          <Checkbox
            label="Lead assignments"
            description="Notify users when leads are assigned to them"
            checked
          />
          <Checkbox
            label="Opportunity updates"
            description="Notify when opportunity stages change"
            checked
          />
          <Checkbox
            label="System maintenance"
            description="Notify users about scheduled maintenance"
            checked
          />
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
              <Icon name="Check" size={20} color="white" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Last Backup</h4>
              <p className="text-sm text-muted-foreground">January 9, 2025 at 2:00 AM</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Run Backup Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Select
          label="Backup Frequency"
          options={[
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' }
          ]}
          value="daily"
        />
        <Input
          label="Retention Period (days)"
          type="number"
          value="30"
          placeholder="Enter retention period"
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Backup Options</h4>
        <div className="space-y-3">
          <Checkbox
            label="Include user data"
            checked
          />
          <Checkbox
            label="Include system logs"
            checked
          />
          <Checkbox
            label="Include file attachments"
           
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'integrations':
        return renderIntegrations();
      case 'notifications':
        return renderNotifications();
      case 'backup':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Settings Navigation */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-card border border-border rounded-lg p-4 elevation-1">
          <h3 className="font-semibold text-foreground mb-4">Settings</h3>
          <nav className="space-y-1">
            {settingSections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === section?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span>{section?.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Settings Content */}
      <div className="flex-1">
        <div className="bg-card border border-border rounded-lg p-6 elevation-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {settingSections?.find(s => s?.id === activeSection)?.name}
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Reset
              </Button>
              <Button variant="default" size="sm">
                Save Changes
              </Button>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;