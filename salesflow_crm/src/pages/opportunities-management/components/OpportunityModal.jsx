import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OpportunityModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  opportunity = null,
  userRole = 'Sales Rep',
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    value: '',
    stage: 'Discovery',
    assignedRep: '',
    expectedCloseDate: '',
    probability: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const stageOptions = [
    { value: 'Discovery', label: 'Discovery' },
    { value: 'Proposal', label: 'Proposal' },
    { value: 'Won', label: 'Won' },
    { value: 'Lost', label: 'Lost' }
  ];

  const repOptions = [
    { value: 'john-doe', label: 'John Doe' },
    { value: 'sarah-wilson', label: 'Sarah Wilson' },
    { value: 'mike-johnson', label: 'Mike Johnson' },
    { value: 'emily-davis', label: 'Emily Davis' }
  ];

  const probabilityOptions = [
    { value: '10', label: '10% - Initial Contact' },
    { value: '25', label: '25% - Qualified Lead' },
    { value: '50', label: '50% - Proposal Sent' },
    { value: '75', label: '75% - Negotiation' },
    { value: '90', label: '90% - Verbal Agreement' },
    { value: '100', label: '100% - Closed Won' },
    { value: '0', label: '0% - Closed Lost' }
  ];

  useEffect(() => {
    if (opportunity) {
      setFormData({
        title: opportunity?.title || '',
        description: opportunity?.description || '',
        value: opportunity?.value?.toString() || '',
        stage: opportunity?.stage || 'Discovery',
        assignedRep: opportunity?.assignedRep || '',
        expectedCloseDate: opportunity?.expectedCloseDate || '',
        probability: opportunity?.probability?.toString() || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        value: '',
        stage: 'Discovery',
        assignedRep: userRole === 'Sales Rep' ? 'john-doe' : '',
        expectedCloseDate: '',
        probability: '25'
      });
    }
    setErrors({});
  }, [opportunity, isOpen, userRole]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData?.value || parseFloat(formData?.value) <= 0) {
      newErrors.value = 'Value must be greater than 0';
    }

    if (!formData?.stage) {
      newErrors.stage = 'Stage is required';
    }

    if ((userRole === 'Sales Manager' || userRole === 'Admin') && !formData?.assignedRep) {
      newErrors.assignedRep = 'Assigned rep is required';
    }

    if (formData?.expectedCloseDate) {
      const closeDate = new Date(formData.expectedCloseDate);
      const today = new Date();
      if (closeDate < today) {
        newErrors.expectedCloseDate = 'Expected close date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const opportunityData = {
        ...formData,
        value: parseFloat(formData?.value),
        probability: formData?.probability ? parseInt(formData?.probability) : null,
        id: opportunity?.id || `opp-${Date.now()}`,
        createdAt: opportunity?.createdAt || new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      };

      await onSave(opportunityData);
      onClose();
    } catch (error) {
      console.error('Error saving opportunity:', error);
      setErrors({ submit: 'Failed to save opportunity. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value) => {
    const numValue = parseFloat(value) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(numValue);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {opportunity ? 'Edit Opportunity' : 'Add New Opportunity'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {opportunity ? 'Update opportunity details' : 'Create a new sales opportunity'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
            
            <Input
              label="Opportunity Title"
              type="text"
              placeholder="Enter opportunity title"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              error={errors?.title}
              required
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                rows={3}
                placeholder="Enter opportunity description (optional)"
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  label="Opportunity Value"
                  type="number"
                  placeholder="0"
                  value={formData?.value}
                  onChange={(e) => handleInputChange('value', e?.target?.value)}
                  error={errors?.value}
                  required
                />
                {formData?.value && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatCurrency(formData?.value)}
                  </p>
                )}
              </div>

              <Select
                label="Stage"
                options={stageOptions}
                value={formData?.stage}
                onChange={(value) => handleInputChange('stage', value)}
                error={errors?.stage}
                required
              />
            </div>
          </div>

          {/* Assignment & Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Assignment & Timeline</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(userRole === 'Sales Manager' || userRole === 'Admin') && (
                <Select
                  label="Assigned Sales Rep"
                  placeholder="Select sales rep"
                  options={repOptions}
                  value={formData?.assignedRep}
                  onChange={(value) => handleInputChange('assignedRep', value)}
                  error={errors?.assignedRep}
                  required
                />
              )}

              <Input
                label="Expected Close Date"
                type="date"
                value={formData?.expectedCloseDate}
                onChange={(e) => handleInputChange('expectedCloseDate', e?.target?.value)}
                error={errors?.expectedCloseDate}
              />
            </div>

            <Select
              label="Win Probability"
              placeholder="Select probability"
              options={probabilityOptions}
              value={formData?.probability}
              onChange={(value) => handleInputChange('probability', value)}
              description="Estimated likelihood of closing this opportunity"
            />
          </div>

          {/* Error Message */}
          {errors?.submit && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-destructive" />
                <span className="text-sm text-destructive">{errors?.submit}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              iconName={opportunity ? "Save" : "Plus"}
              iconPosition="left"
            >
              {opportunity ? 'Update Opportunity' : 'Create Opportunity'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpportunityModal;