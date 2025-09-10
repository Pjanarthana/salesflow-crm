import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '../../components/ui/BrandHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import OpportunityFilters from './components/OpportunityFilters';
import OpportunityTable from './components/OpportunityTable';
import OpportunityModal from './components/OpportunityModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const OpportunitiesManagement = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('Sales Rep');
  const [userName, setUserName] = useState('John Doe');
  
  // Modal states
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [opportunitiesToDelete, setOpportunitiesToDelete] = useState([]);
  
  // Data states
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [filters, setFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Mock opportunities data
  const mockOpportunities = [
    {
      id: 'opp-001',
      title: 'Enterprise Software License',
      description: 'Annual software licensing deal for Fortune 500 company',
      value: 250000,
      stage: 'Proposal',
      assignedRep: 'John Doe',
      probability: 75,
      expectedCloseDate: '2025-01-15',
      createdAt: '2024-11-15T10:30:00Z',
      updatedAt: '2024-12-01T14:20:00Z'
    },
    {
      id: 'opp-002',
      title: 'Cloud Migration Services',
      description: 'Complete cloud infrastructure migration for mid-size company',
      value: 180000,
      stage: 'Discovery',
      assignedRep: 'Sarah Wilson',
      probability: 25,
      expectedCloseDate: '2025-02-28',
      createdAt: '2024-12-01T09:15:00Z',
      updatedAt: '2024-12-05T11:45:00Z'
    },
    {
      id: 'opp-003',
      title: 'Security Audit & Compliance',
      description: 'Comprehensive security assessment and compliance implementation',
      value: 95000,
      stage: 'Won',
      assignedRep: 'Mike Johnson',
      probability: 100,
      expectedCloseDate: '2024-12-20',
      createdAt: '2024-10-20T16:00:00Z',
      updatedAt: '2024-12-08T10:30:00Z'
    },
    {
      id: 'opp-004',
      title: 'Digital Transformation Consulting',
      description: 'Strategic consulting for digital transformation initiative',
      value: 320000,
      stage: 'Proposal',
      assignedRep: 'Emily Davis',
      probability: 50,
      expectedCloseDate: '2025-03-15',
      createdAt: '2024-11-28T13:20:00Z',
      updatedAt: '2024-12-07T15:10:00Z'
    },
    {
      id: 'opp-005',
      title: 'Mobile App Development',
      description: 'Custom mobile application development for retail chain',
      value: 150000,
      stage: 'Discovery',
      assignedRep: 'John Doe',
      probability: 25,
      expectedCloseDate: '2025-04-30',
      createdAt: '2024-12-05T11:00:00Z',
      updatedAt: '2024-12-08T09:30:00Z'
    },
    {
      id: 'opp-006',
      title: 'Data Analytics Platform',
      description: 'Implementation of advanced analytics and reporting platform',
      value: 275000,
      stage: 'Lost',
      assignedRep: 'Sarah Wilson',
      probability: 0,
      expectedCloseDate: '2024-12-31',
      createdAt: '2024-09-15T14:45:00Z',
      updatedAt: '2024-11-30T16:20:00Z'
    }
  ];

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user?.role || 'Sales Rep');
      setUserName(user?.name || 'John Doe');
    }

    // Load opportunities based on user role
    const loadOpportunities = () => {
      setIsLoading(true);
      
      // Filter opportunities based on user role
      let userOpportunities = mockOpportunities;
      if (userRole === 'Sales Rep') {
        userOpportunities = mockOpportunities?.filter(opp => opp?.assignedRep === userName);
      }
      
      setOpportunities(userOpportunities);
      setFilteredOpportunities(userOpportunities);
      setIsLoading(false);
    };

    loadOpportunities();
  }, [userRole, userName]);

  // Filter opportunities based on current filters
  useEffect(() => {
    let filtered = [...opportunities];

    // Search filter
    if (filters?.search) {
      filtered = filtered?.filter(opp =>
        opp?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        opp?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Stage filter
    if (filters?.stage) {
      filtered = filtered?.filter(opp => opp?.stage === filters?.stage);
    }

    // Value range filter
    if (filters?.valueRange) {
      filtered = filtered?.filter(opp =>
        opp?.value >= filters?.valueRange?.[0] && opp?.value <= filters?.valueRange?.[1]
      );
    }

    // Date range filter
    if (filters?.dateRange) {
      const now = new Date();
      let startDate = new Date();

      switch (filters?.dateRange) {
        case 'today':
          startDate?.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate?.setDate(now?.getDate() - 7);
          break;
        case 'month':
          startDate?.setMonth(now?.getMonth() - 1);
          break;
        case 'quarter':
          startDate?.setMonth(now?.getMonth() - 3);
          break;
        case 'year':
          startDate?.setFullYear(now?.getFullYear() - 1);
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        filtered = filtered?.filter(opp => new Date(opp.createdAt) >= startDate);
      }
    }

    // Assigned rep filter (for managers)
    if (filters?.assignedRep && (userRole === 'Sales Manager' || userRole === 'Admin')) {
      filtered = filtered?.filter(opp => opp?.assignedRep === filters?.assignedRep);
    }

    setFilteredOpportunities(filtered);
  }, [filters, opportunities, userRole]);

  // Calculate pipeline metrics
  const getPipelineMetrics = () => {
    const totalValue = filteredOpportunities?.reduce((sum, opp) => sum + opp?.value, 0);
    const stageDistribution = filteredOpportunities?.reduce((acc, opp) => {
      acc[opp.stage] = (acc?.[opp?.stage] || 0) + 1;
      return acc;
    }, {});

    return { totalValue, stageDistribution };
  };

  const { totalValue, stageDistribution } = getPipelineMetrics();

  // Event handlers
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddOpportunity = () => {
    setSelectedOpportunity(null);
    setIsOpportunityModalOpen(true);
  };

  const handleEditOpportunity = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsOpportunityModalOpen(true);
  };

  const handleSaveOpportunity = async (opportunityData) => {
    if (selectedOpportunity) {
      // Update existing opportunity
      setOpportunities(prev =>
        prev?.map(opp => opp?.id === selectedOpportunity?.id ? opportunityData : opp)
      );
    } else {
      // Add new opportunity
      setOpportunities(prev => [opportunityData, ...prev]);
    }
    setIsOpportunityModalOpen(false);
    setSelectedOpportunity(null);
  };

  const handleDeleteOpportunities = (opportunityIds) => {
    setOpportunitiesToDelete(opportunityIds);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setOpportunities(prev =>
      prev?.filter(opp => !opportunitiesToDelete?.includes(opp?.id))
    );
    setIsDeleteModalOpen(false);
    setOpportunitiesToDelete([]);
  };

  const handleStageUpdate = (opportunityId, newStage) => {
    setOpportunities(prev =>
      prev?.map(opp =>
        opp?.id === opportunityId
          ? { ...opp, stage: newStage, updatedAt: new Date()?.toISOString() }
          : opp
      )
    );
  };

  const handleBulkStageUpdate = (opportunityIds, newStage) => {
    setOpportunities(prev =>
      prev?.map(opp =>
        opportunityIds?.includes(opp?.id)
          ? { ...opp, stage: newStage, updatedAt: new Date()?.toISOString() }
          : opp
      )
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <BrandHeader userRole={userRole} userName={userName} onLogout={handleLogout} />
        <DashboardNavigation userRole={userRole} />
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-muted-foreground">Loading opportunities...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader userRole={userRole} userName={userName} onLogout={handleLogout} />
      <DashboardNavigation userRole={userRole} />
      <main className="container mx-auto px-6 py-8 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Opportunities Management</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your sales opportunities through the pipeline
            </p>
          </div>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={handleAddOpportunity}
            className="micro-interaction"
          >
            Add Opportunity
          </Button>
        </div>

        {/* Filters */}
        <OpportunityFilters
          onFilterChange={handleFilterChange}
          userRole={userRole}
          totalValue={totalValue}
          stageDistribution={stageDistribution}
        />

        {/* Opportunities Table */}
        <OpportunityTable
          opportunities={filteredOpportunities}
          userRole={userRole}
          onEdit={handleEditOpportunity}
          onDelete={handleDeleteOpportunities}
          onStageUpdate={handleStageUpdate}
          onBulkStageUpdate={handleBulkStageUpdate}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Target" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredOpportunities?.length}</p>
                <p className="text-sm text-muted-foreground">Active Opportunities</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="var(--color-success)" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stageDistribution?.Won || 0}
                </p>
                <p className="text-sm text-muted-foreground">Won This Period</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={20} color="var(--color-warning)" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stageDistribution?.Proposal || 0}
                </p>
                <p className="text-sm text-muted-foreground">In Proposal Stage</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <OpportunityModal
        isOpen={isOpportunityModalOpen}
        onClose={() => {
          setIsOpportunityModalOpen(false);
          setSelectedOpportunity(null);
        }}
        onSave={handleSaveOpportunity}
        opportunity={selectedOpportunity}
        userRole={userRole}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setOpportunitiesToDelete([]);
        }}
        onConfirm={handleConfirmDelete}
        opportunityIds={opportunitiesToDelete}
        opportunities={opportunities}
      />
    </div>
  );
};

export default OpportunitiesManagement;