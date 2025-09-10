import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandHeader from '../../components/ui/BrandHeader';
import DashboardNavigation from '../../components/ui/DashboardNavigation';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import LeadsTable from './components/LeadsTable';
import OpportunitiesTable from './components/OpportunitiesTable';
import ActivityFeed from './components/ActivityFeed';
import AddLeadModal from './components/AddLeadModal';
import AddOpportunityModal from './components/AddOpportunityModal';
import ConvertLeadModal from './components/ConvertLeadModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const SalesRepDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('leads');
  const [userData, setUserData] = useState(null);
  
  // Modal states
  const [modals, setModals] = useState({
    addLead: false,
    addOpportunity: false,
    convertLead: false,
    deleteConfirm: false
  });
  
  // Data states
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // Mock data initialization
  useEffect(() => {
    const initializeData = () => {
      // Get user data from localStorage
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }

      // Mock leads data
      const mockLeads = [
        {
          id: 1001,
          name: "Sarah Johnson",
          email: "sarah.johnson@techcorp.com",
          phone: "+1 (555) 123-4567",
          status: "New",
          createdDate: "12/08/2024",
          assignedTo: "You"
        },
        {
          id: 1002,
          name: "Michael Chen",
          email: "m.chen@innovatetech.com",
          phone: "+1 (555) 234-5678",
          status: "Contacted",
          createdDate: "12/07/2024",
          assignedTo: "You"
        },
        {
          id: 1003,
          name: "Emily Rodriguez",
          email: "emily.r@globalsoft.com",
          phone: "+1 (555) 345-6789",
          status: "Qualified",
          createdDate: "12/06/2024",
          assignedTo: "You"
        },
        {
          id: 1004,
          name: "David Thompson",
          email: "d.thompson@nexustech.com",
          phone: "+1 (555) 456-7890",
          status: "New",
          createdDate: "12/05/2024",
          assignedTo: "You"
        },
        {
          id: 1005,
          name: "Lisa Wang",
          email: "lisa.wang@cloudtech.com",
          phone: "+1 (555) 567-8901",
          status: "Contacted",
          createdDate: "12/04/2024",
          assignedTo: "You"
        }
      ];

      // Mock opportunities data
      const mockOpportunities = [
        {
          id: 2001,
          title: "Enterprise Software License",
          value: 45000,
          stage: "Proposal",
          createdDate: "12/01/2024",
          assignedTo: "You"
        },
        {
          id: 2002,
          title: "Cloud Migration Project",
          value: 75000,
          stage: "Discovery",
          createdDate: "11/28/2024",
          assignedTo: "You"
        },
        {
          id: 2003,
          title: "Security Audit Services",
          value: 25000,
          stage: "Won",
          createdDate: "11/25/2024",
          assignedTo: "You"
        },
        {
          id: 2004,
          title: "Data Analytics Platform",
          value: 120000,
          stage: "Discovery",
          createdDate: "11/20/2024",
          assignedTo: "You"
        }
      ];

      // Mock activities data
      const mockActivities = [
        {
          id: 3001,
          type: "lead_created",
          title: "New lead added",
          description: "Sarah Johnson from TechCorp was added to your pipeline",
          timestamp: new Date(Date.now() - 300000),
          value: null
        },
        {
          id: 3002,
          type: "opportunity_won",
          title: "Opportunity won",
          description: "Security Audit Services deal was successfully closed",
          timestamp: new Date(Date.now() - 1800000),
          value: "$25,000"
        },
        {
          id: 3003,
          type: "lead_converted",
          title: "Lead converted",
          description: "Emily Rodriguez was converted to an opportunity",
          timestamp: new Date(Date.now() - 3600000),
          value: null
        },
        {
          id: 3004,
          type: "status_updated",
          title: "Lead status updated",
          description: "Michael Chen status changed from New to Contacted",
          timestamp: new Date(Date.now() - 7200000),
          value: null
        },
        {
          id: 3005,
          type: "opportunity_created",
          title: "New opportunity created",
          description: "Data Analytics Platform opportunity added to pipeline",
          timestamp: new Date(Date.now() - 10800000),
          value: "$120,000"
        }
      ];

      setLeads(mockLeads);
      setOpportunities(mockOpportunities);
      setActivities(mockActivities);
    };

    initializeData();
  }, []);

  // Calculate metrics
  const getMetrics = () => {
    const leadsByStatus = leads?.reduce((acc, lead) => {
      acc[lead.status] = (acc?.[lead?.status] || 0) + 1;
      return acc;
    }, {});

    const opportunitiesByStage = opportunities?.reduce((acc, opp) => {
      acc[opp.stage] = (acc?.[opp?.stage] || 0) + 1;
      return acc;
    }, {});

    const totalOpportunityValue = opportunities?.filter(opp => opp?.stage !== 'Lost')?.reduce((sum, opp) => sum + opp?.value, 0);

    const wonOpportunities = opportunities?.filter(opp => opp?.stage === 'Won');
    const wonValue = wonOpportunities?.reduce((sum, opp) => sum + opp?.value, 0);

    return {
      leads: {
        new: leadsByStatus?.['New'] || 0,
        contacted: leadsByStatus?.['Contacted'] || 0,
        qualified: leadsByStatus?.['Qualified'] || 0,
        total: leads?.length
      },
      opportunities: {
        discovery: opportunitiesByStage?.['Discovery'] || 0,
        proposal: opportunitiesByStage?.['Proposal'] || 0,
        won: opportunitiesByStage?.['Won'] || 0,
        lost: opportunitiesByStage?.['Lost'] || 0,
        total: opportunities?.length,
        totalValue: totalOpportunityValue,
        wonValue: wonValue
      }
    };
  };

  const metrics = getMetrics();

  // Modal handlers
  const openModal = (modalName, data = null) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
    if (modalName === 'convertLead') setSelectedLead(data);
    if (modalName === 'deleteConfirm') setDeleteItem(data);
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    if (modalName === 'convertLead') setSelectedLead(null);
    if (modalName === 'deleteConfirm') setDeleteItem(null);
  };

  // CRUD handlers
  const handleAddLead = (newLead) => {
    setLeads(prev => [newLead, ...prev]);
    
    // Add activity
    const activity = {
      id: Date.now(),
      type: "lead_created",
      title: "New lead added",
      description: `${newLead?.name} was added to your pipeline`,
      timestamp: new Date(),
      value: null
    };
    setActivities(prev => [activity, ...prev]);
  };

  const handleAddOpportunity = (newOpportunity) => {
    setOpportunities(prev => [newOpportunity, ...prev]);
    
    // Add activity
    const activity = {
      id: Date.now(),
      type: "opportunity_created",
      title: "New opportunity created",
      description: `${newOpportunity?.title} opportunity added to pipeline`,
      timestamp: new Date(),
      value: `$${newOpportunity?.value?.toLocaleString()}`
    };
    setActivities(prev => [activity, ...prev]);
  };

  const handleConvertLead = (leadId, newOpportunity) => {
    // Update lead status to Qualified
    setLeads(prev => prev?.map(lead => 
      lead?.id === leadId ? { ...lead, status: 'Qualified' } : lead
    ));
    
    // Add new opportunity
    setOpportunities(prev => [newOpportunity, ...prev]);
    
    // Add activity
    const lead = leads?.find(l => l?.id === leadId);
    const activity = {
      id: Date.now(),
      type: "lead_converted",
      title: "Lead converted",
      description: `${lead?.name} was converted to an opportunity`,
      timestamp: new Date(),
      value: `$${newOpportunity?.value?.toLocaleString()}`
    };
    setActivities(prev => [activity, ...prev]);
  };

  const handleLeadStatusUpdate = (leadId, newStatus) => {
    const oldLead = leads?.find(l => l?.id === leadId);
    setLeads(prev => prev?.map(lead => 
      lead?.id === leadId ? { ...lead, status: newStatus } : lead
    ));
    
    // Add activity
    const activity = {
      id: Date.now(),
      type: "status_updated",
      title: "Lead status updated",
      description: `${oldLead?.name} status changed from ${oldLead?.status} to ${newStatus}`,
      timestamp: new Date(),
      value: null
    };
    setActivities(prev => [activity, ...prev]);
  };

  const handleOpportunityStageUpdate = (opportunityId, newStage) => {
    const oldOpportunity = opportunities?.find(o => o?.id === opportunityId);
    setOpportunities(prev => prev?.map(opp => 
      opp?.id === opportunityId ? { ...opp, stage: newStage } : opp
    ));
    
    // Add activity
    const activity = {
      id: Date.now(),
      type: newStage === 'Won' ? 'opportunity_won' : newStage === 'Lost' ? 'opportunity_lost' : 'status_updated',
      title: newStage === 'Won' ? 'Opportunity won' : newStage === 'Lost' ? 'Opportunity lost' : 'Opportunity stage updated',
      description: `${oldOpportunity?.title} ${newStage === 'Won' ? 'was successfully closed' : newStage === 'Lost' ? 'was marked as lost' : `stage changed to ${newStage}`}`,
      timestamp: new Date(),
      value: newStage === 'Won' ? `$${oldOpportunity?.value?.toLocaleString()}` : null
    };
    setActivities(prev => [activity, ...prev]);
  };

  const handleDelete = () => {
    if (deleteItem?.type === 'lead') {
      setLeads(prev => prev?.filter(lead => lead?.id !== deleteItem?.id));
    } else if (deleteItem?.type === 'opportunity') {
      setOpportunities(prev => prev?.filter(opp => opp?.id !== deleteItem?.id));
    }
    closeModal('deleteConfirm');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader 
        userRole="Sales Rep"
        userName={userData?.name || "John Doe"}
        onLogout={handleLogout}
      />
      <DashboardNavigation userRole="Sales Rep" />
      <main className="container mx-auto px-6 py-8">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="New Leads"
            value={metrics?.leads?.new}
            icon="UserPlus"
            color="blue"
            trend="up"
            trendValue="+12%"
            subtitle="This month"
          />
          <MetricsCard
            title="Contacted Leads"
            value={metrics?.leads?.contacted}
            icon="Phone"
            color="amber"
            trend="up"
            trendValue="+8%"
            subtitle="This month"
          />
          <MetricsCard
            title="Active Opportunities"
            value={metrics?.opportunities?.total - metrics?.opportunities?.won - metrics?.opportunities?.lost}
            icon="Target"
            color="purple"
            trend="up"
            trendValue="+15%"
            subtitle="In pipeline"
          />
          <MetricsCard
            title="Won Deals"
            value={`$${metrics?.opportunities?.wonValue?.toLocaleString()}`}
            icon="Trophy"
            color="green"
            trend="up"
            trendValue="+25%"
            subtitle="This quarter"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('leads')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'leads' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    My Leads ({metrics?.leads?.total})
                  </button>
                  <button
                    onClick={() => setActiveTab('opportunities')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === 'opportunities' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    My Opportunities ({metrics?.opportunities?.total})
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  {activeTab === 'leads' ? (
                    <Button
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => openModal('addLead')}
                    >
                      Add Lead
                    </Button>
                  ) : (
                    <Button
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => openModal('addOpportunity')}
                    >
                      Add Opportunity
                    </Button>
                  )}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'leads' ? (
                  <LeadsTable
                    leads={leads}
                    onEdit={(lead) => console.log('Edit lead:', lead)}
                    onDelete={(lead) => openModal('deleteConfirm', { ...lead, type: 'lead' })}
                    onConvert={(lead) => openModal('convertLead', lead)}
                    onStatusUpdate={handleLeadStatusUpdate}
                  />
                ) : (
                  <OpportunitiesTable
                    opportunities={opportunities}
                    onEdit={(opp) => console.log('Edit opportunity:', opp)}
                    onDelete={(opp) => openModal('deleteConfirm', { ...opp, type: 'opportunity' })}
                    onStageUpdate={handleOpportunityStageUpdate}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </main>
      {/* Modals */}
      <AddLeadModal
        isOpen={modals?.addLead}
        onClose={() => closeModal('addLead')}
        onSave={handleAddLead}
      />
      <AddOpportunityModal
        isOpen={modals?.addOpportunity}
        onClose={() => closeModal('addOpportunity')}
        onSave={handleAddOpportunity}
      />
      <ConvertLeadModal
        isOpen={modals?.convertLead}
        onClose={() => closeModal('convertLead')}
        onConvert={handleConvertLead}
        lead={selectedLead}
      />
      <DeleteConfirmModal
        isOpen={modals?.deleteConfirm}
        onClose={() => closeModal('deleteConfirm')}
        onConfirm={handleDelete}
        title={`Delete ${deleteItem?.type === 'lead' ? 'Lead' : 'Opportunity'}`}
        message={`This will permanently delete the ${deleteItem?.type === 'lead' ? 'lead' : 'opportunity'} and all associated data.`}
        itemName={deleteItem?.name || deleteItem?.title}
      />
    </div>
  );
};

export default SalesRepDashboard;