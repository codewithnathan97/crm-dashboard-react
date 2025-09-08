import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CustomerManagement from './components/CustomerManagement';
import Settings from './components/Settings';
import './index.css';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <CustomerManagement />;
      case 'deals':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Deals</h1>
            <div className="bg-white rounded-lg p-6 card-shadow">
              <p className="text-gray-600">Deals management section coming soon...</p>
            </div>
          </div>
        );
      case 'pipeline':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Sales Pipeline</h1>
            <div className="bg-white rounded-lg p-6 card-shadow">
              <p className="text-gray-600">Pipeline visualization coming soon...</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Analytics</h1>
            <div className="bg-white rounded-lg p-6 card-shadow">
              <p className="text-gray-600">Advanced analytics coming soon...</p>
            </div>
          </div>
        );
      case 'activities':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Activities</h1>
            <div className="bg-white rounded-lg p-6 card-shadow">
              <p className="text-gray-600">Activity tracking coming soon...</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports</h1>
            <div className="bg-white rounded-lg p-6 card-shadow">
              <p className="text-gray-600">Reporting dashboard coming soon...</p>
            </div>
          </div>
        );
      case 'forecasting':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Sales Forecasting</h1>
            <div className="bg-white rounded-lg p-6 card-shadow">
              <p className="text-gray-600">Forecasting tools coming soon...</p>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Calendar</h1>
            <div className="bg-white rounded-lg p-6 card-shadow">
              <p className="text-gray-600">Calendar integration coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;