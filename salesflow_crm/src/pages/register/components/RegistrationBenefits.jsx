import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationBenefits = () => {
  const benefits = [
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Work seamlessly with your sales team and managers'
    },
    {
      icon: 'Target',
      title: 'Lead Management',
      description: 'Track and convert leads into opportunities efficiently'
    },
    {
      icon: 'BarChart3',
      title: 'Performance Analytics',
      description: 'Monitor your sales performance with detailed insights'
    },
    {
      icon: 'Shield',
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security'
    }
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-8 lg:py-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground">
            Why Choose SalesFlow CRM?
          </h3>
          <p className="text-muted-foreground">
            Transform your sales process with our comprehensive CRM solution designed for modern sales teams.
          </p>
        </div>

        <div className="space-y-6">
          {benefits?.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name={benefit?.icon} size={20} className="text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">{benefit?.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit?.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-success" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-success" />
              <span>10k+ Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationBenefits;