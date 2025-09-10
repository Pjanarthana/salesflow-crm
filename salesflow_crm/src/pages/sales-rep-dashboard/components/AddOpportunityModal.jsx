import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddOpportunityModal = ({ isOpen, onClose, onSave }) => {
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
        assignedTo: 'You'
      };
      
      onSave(newOpportunity);
      handleClose();
    } catch (error) {
      console.error('Error creating opportunity:', error);
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

  if (!isOpen) return null;

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
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={18} className="text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">Add New Opportunity</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={handleClose}
          />
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
            label="Value (USD)"
            type="number"
            placeholder="Enter opportunity value"
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
              iconName="Plus"
              iconPosition="left"
            >
              Add Opportunity
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOpportunityModal;