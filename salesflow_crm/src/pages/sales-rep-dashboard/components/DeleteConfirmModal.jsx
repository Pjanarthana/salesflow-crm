import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  itemName,
  isLoading = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-xl w-full max-w-md mx-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={18} className="text-red-600" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            disabled={isLoading}
          />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Trash2" size={24} className="text-red-600" />
            </div>
            
            <h3 className="text-lg font-medium text-foreground mb-2">
              Are you sure?
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4">
              {message}
            </p>
            
            {itemName && (
              <div className="bg-muted/50 rounded-lg p-3 mb-6">
                <p className="text-sm font-medium text-foreground">{itemName}</p>
              </div>
            )}
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-red-600 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium">This action cannot be undone</p>
                  <p className="text-xs mt-1">All associated data will be permanently removed from the system.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              loading={isLoading}
              iconName="Trash2"
              iconPosition="left"
              onClick={onConfirm}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;