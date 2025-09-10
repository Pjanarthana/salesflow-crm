import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  opportunityIds = [],
  opportunities = [],
  isLoading = false,
  className = '' 
}) => {
  if (!isOpen) return null;

  const isMultiple = opportunityIds?.length > 1;
  const selectedOpportunities = opportunities?.filter(opp => opportunityIds?.includes(opp?.id));
  
  const getTotalValue = () => {
    return selectedOpportunities?.reduce((total, opp) => total + (opp?.value || 0), 0);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`bg-card border border-border rounded-lg shadow-lg w-full max-w-md ${className}`}>
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {isMultiple ? 'Delete Opportunities' : 'Delete Opportunity'}
              </h2>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-foreground">
            {isMultiple 
              ? `Are you sure you want to delete ${opportunityIds?.length} opportunities?`
              : `Are you sure you want to delete this opportunity?`
            }
          </p>

          {/* Opportunity Details */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            {selectedOpportunities?.slice(0, 3)?.map((opportunity) => (
              <div key={opportunity?.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{opportunity?.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {opportunity?.stage} • {formatCurrency(opportunity?.value)}
                  </p>
                </div>
              </div>
            ))}
            
            {selectedOpportunities?.length > 3 && (
              <div className="text-sm text-muted-foreground text-center pt-2 border-t border-border">
                And {selectedOpportunities?.length - 3} more opportunities...
              </div>
            )}
          </div>

          {/* Impact Summary */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingDown" size={16} className="text-destructive" />
              <span className="text-sm font-medium text-destructive">Impact Summary</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {isMultiple ? 'Opportunities' : 'Opportunity'}:
                </span>
                <span className="text-foreground">{opportunityIds?.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Value:</span>
                <span className="font-medium text-destructive">
                  {formatCurrency(getTotalValue())}
                </span>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="AlertCircle" size={16} className="text-warning mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-warning mb-1">Warning</p>
              <p className="text-muted-foreground">
                Deleting {isMultiple ? 'these opportunities' : 'this opportunity'} will permanently remove all associated data, including notes, activities, and history. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isLoading}
            iconName="Trash2"
            iconPosition="left"
          >
            {isMultiple ? `Delete ${opportunityIds?.length} Opportunities` : 'Delete Opportunity'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;