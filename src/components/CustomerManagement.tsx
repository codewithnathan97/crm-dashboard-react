import React, { useState, useEffect } from 'react';
import { Customer, Deal, Activity } from '../types';
import { mockCustomers, mockDeals, mockActivities } from '../data/mockData';
import CustomerList from './CustomerList';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import CustomerDetails from './CustomerDetails';
import DeleteConfirmation from './DeleteConfirmation';

type ViewMode = 'list' | 'add' | 'edit' | 'details' | 'delete';

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [deals] = useState<Deal[]>(mockDeals);
  const [activities] = useState<Activity[]>(mockActivities);
  const [currentView, setCurrentView] = useState<ViewMode>('list');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize customers data
  useEffect(() => {
    setCustomers(mockCustomers);
  }, []);

  // Generate unique ID for new customers
  const generateId = (): string => {
    return Math.max(...customers.map(c => parseInt(c.id)), 0) + 1 + '';
  };

  const handleAddCustomer = () => {
    setCurrentView('add');
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentView('edit');
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentView('details');
  };

  const handleDeleteCustomer = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setSelectedCustomer(customer);
      setCurrentView('delete');
    }
  };

  const handleSaveNewCustomer = async (customerData: Omit<Customer, 'id'>) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCustomer: Customer = {
        ...customerData,
        id: generateId()
      };

      setCustomers(prev => [...prev, newCustomer]);
      setCurrentView('list');
      
      // You could add a success toast notification here
      console.log('Customer added successfully:', newCustomer);
    } catch (error) {
      console.error('Error adding customer:', error);
      // You could add an error toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEditedCustomer = async (updatedCustomer: Customer) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCustomers(prev => 
        prev.map(customer => 
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        )
      );
      
      setCurrentView('list');
      setSelectedCustomer(null);
      
      // You could add a success toast notification here
      console.log('Customer updated successfully:', updatedCustomer);
    } catch (error) {
      console.error('Error updating customer:', error);
      // You could add an error toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCustomer) return;
    
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCustomers(prev => 
        prev.filter(customer => customer.id !== selectedCustomer.id)
      );
      
      setCurrentView('list');
      setSelectedCustomer(null);
      
      // You could add a success toast notification here
      console.log('Customer deleted successfully:', selectedCustomer);
    } catch (error) {
      console.error('Error deleting customer:', error);
      // You could add an error toast notification here
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedCustomer(null);
  };

  const handleEditFromDetails = () => {
    if (selectedCustomer) {
      setCurrentView('edit');
    }
  };

  const handleDeleteFromDetails = () => {
    if (selectedCustomer) {
      setCurrentView('delete');
    }
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'add':
        return (
          <AddCustomer
            onSave={handleSaveNewCustomer}
            onCancel={handleCancel}
            loading={loading}
          />
        );

      case 'edit':
        return selectedCustomer ? (
          <EditCustomer
            customer={selectedCustomer}
            onSave={handleSaveEditedCustomer}
            onCancel={handleCancel}
            loading={loading}
          />
        ) : null;

      case 'details':
        return selectedCustomer ? (
          <CustomerDetails
            customer={selectedCustomer}
            deals={deals}
            activities={activities}
            onEdit={handleEditFromDetails}
            onDelete={handleDeleteFromDetails}
            onClose={handleCancel}
          />
        ) : null;

      case 'delete':
        return selectedCustomer ? (
          <DeleteConfirmation
            customer={selectedCustomer}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancel}
            loading={loading}
          />
        ) : null;

      default:
        return (
          <CustomerList
            customers={customers}
            onAddCustomer={handleAddCustomer}
            onEditCustomer={handleEditCustomer}
            onDeleteCustomer={handleDeleteCustomer}
            onViewCustomer={handleViewCustomer}
            loading={false}
          />
        );
    }
  };

  return (
    <div className="p-6">
      {/* Main Content */}
      {currentView === 'list' && renderCurrentView()}
      
      {/* Modals */}
      {currentView !== 'list' && renderCurrentView()}
    </div>
  );
};

export default CustomerManagement;