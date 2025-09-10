import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ConvertLeadModal = ({ isOpen, onClose, onConvert, lead }) => {
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    stage: 'Discovery'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const stageOptions = [
    { value: 'Discovery', label: 'Discovery' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' }
  ];

  React.useEffect(() => {
    if (lead && isOpen) {
      setFormData({
        title: `${lead?.name} - Opportunity`,
        value: '',
        stage: 'Discovery'
      });
    }
  }, [lead, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData?.value?.trim()) {
      newErrors.value = 'Value is required';
    } else if (isNaN(parseFloat(formData?.value)) || parseFloat(formData?.value) <= 0) {
      newErrors.value = 'Please enter a valid positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newOpportunity = {
        id: Date.now(),
        title: formData?.title,
        value: parseFloat(formData?.value),
        stage: formData?.stage,
        createdDate: new Date()?.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        }),
        assignedTo: 'You',
        convertedFromLead: lead?.id
      };
      
      onConvert(lead?.id, newOpportunity);
      handleClose();
    } catch (error) {
      console.error('Error converting lead:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      value: '',
      stage: 'Discovery'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-xl w-full max-w-md mx-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="ArrowRight" size={18} className="text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Convert Lead to Opportunity</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={handleClose}
          />
        </div>
        
        {/* Lead Info */}
        <div className="p-6 border-b border-border bg-muted/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">{lead?.name}</h3>
              <p className="text-sm text-muted-foreground">{lead?.email}</p>
            </div>
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Opportunity Title"
            type="text"
            placeholder="Enter opportunity title"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            error={errors?.title}
            required
          />
          
          <Input
            label="Estimated Value (USD)"
            type="number"
            placeholder="Enter estimated value"
            value={formData?.value}
            onChange={(e) => handleInputChange('value', e?.target?.value)}
            error={errors?.value}
            min="0"
            step="0.01"
            required
          />
          
          <Select
            label="Initial Stage"
            options={stageOptions}
            value={formData?.stage}
            onChange={(value) => handleInputChange('stage', value)}
            required
          />
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Converting this lead will:</p>
                <ul className="mt-1 space-y-1 text-xs">
                  <li>• Update lead status to "Qualified"</li>
                  <li>• Create a new opportunity with the details above</li>
                  <li>• Link the opportunity to this lead</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              iconName="ArrowRight"
              iconPosition="left"
            >
              Convert Lead
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConvertLeadModal;