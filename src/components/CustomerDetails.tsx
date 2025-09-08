import React from 'react';
import { X, User, Mail, Phone, Building2, DollarSign, Calendar, Clock, Edit, Trash2, Activity } from 'lucide-react';
import { Customer, Deal, Activity as ActivityType } from '../types';

interface CustomerDetailsProps {
  customer: Customer;
  deals?: Deal[];
  activities?: ActivityType[];
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  deals = [],
  activities = [],
  onEdit,
  onDelete,
  onClose
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: Customer['status']) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', text: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800', text: 'Inactive' },
      prospect: { color: 'bg-blue-100 text-blue-800', text: 'Prospect' }
    };

    const config = statusConfig[status];
    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getDealsStats = () => {
    const customerDeals = deals.filter(deal => deal.customerId === customer.id);
    const totalValue = customerDeals.reduce((sum, deal) => sum + deal.value, 0);
    const wonDeals = customerDeals.filter(deal => deal.stage === 'closed-won');
    const activeDeals = customerDeals.filter(deal => 
      !['closed-won', 'closed-lost'].includes(deal.stage)
    );

    return {
      total: customerDeals.length,
      totalValue,
      won: wonDeals.length,
      active: activeDeals.length
    };
  };

  const getActivityIcon = (type: string) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case 'call':
        return <Phone className={`${iconClass} text-blue-500`} />;
      case 'email':
        return <Mail className={`${iconClass} text-green-500`} />;
      case 'meeting':
        return <Calendar className={`${iconClass} text-purple-500`} />;
      case 'deal-created':
        return <DollarSign className={`${iconClass} text-orange-500`} />;
      case 'deal-won':
        return <Activity className={`${iconClass} text-green-600`} />;
      case 'deal-lost':
        return <Activity className={`${iconClass} text-red-500`} />;
      default:
        return <Activity className={`${iconClass} text-gray-500`} />;
    }
  };

  const dealsStats = getDealsStats();
  const customerActivities = activities.filter(activity => activity.customerId === customer.id);
  const recentActivities = customerActivities
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {customer.avatar ? (
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={customer.avatar}
                  alt={customer.name}
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-white">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
              <p className="text-gray-600 flex items-center mt-1">
                <Building2 className="w-4 h-4 mr-1" />
                {customer.company}
              </p>
              <div className="mt-2">{getStatusBadge(customer.status)}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Customer"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Customer"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{customer.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Customer Value</p>
                    <p className="text-gray-900 font-semibold">{formatCurrency(customer.value)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="text-gray-900">{formatDate(customer.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Last Contact</p>
                  <p className="text-gray-900">{formatDate(customer.lastContact)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Deals Overview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Deals Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{dealsStats.total}</p>
                <p className="text-sm text-blue-600">Total Deals</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{dealsStats.won}</p>
                <p className="text-sm text-green-600">Won Deals</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{dealsStats.active}</p>
                <p className="text-sm text-orange-600">Active Deals</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(dealsStats.totalValue)}</p>
                <p className="text-sm text-purple-600">Total Value</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-600" />
              Recent Activity
            </h3>
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      {activity.dealTitle && (
                        <p className="text-xs text-blue-600 mt-1">
                          Deal: {activity.dealTitle}
                        </p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-500">{activity.assignedTo}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-xs text-gray-400">
                      {formatTime(activity.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Recent Activity</h4>
                <p className="text-gray-500">No activities recorded for this customer yet.</p>
              </div>
            )}
          </div>

          {/* Customer Deals */}
          {deals.filter(deal => deal.customerId === customer.id).length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Associated Deals</h3>
              <div className="space-y-3">
                {deals
                  .filter(deal => deal.customerId === customer.id)
                  .map((deal) => (
                    <div key={deal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{deal.title}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">
                            Stage: <span className="capitalize">{deal.stage.replace('-', ' ')}</span>
                          </span>
                          <span className="text-sm text-gray-500">
                            Probability: {deal.probability}%
                          </span>
                          <span className="text-sm text-gray-500">
                            Expected Close: {formatDate(deal.expectedCloseDate)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(deal.value)}</p>
                        <p className="text-sm text-gray-500">{deal.assignedTo}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;