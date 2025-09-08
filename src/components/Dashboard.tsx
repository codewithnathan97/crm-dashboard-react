import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { DollarSign, Users, TrendingUp, Target, Calendar, Phone, Mail, FileText } from 'lucide-react';
import MetricCard from './MetricCard';
import { mockSalesMetrics, mockRevenueData, mockPipelineData, mockActivities, mockTeamMembers } from '../data/mockData';

const Dashboard: React.FC = () => {
  const pieColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4 text-blue-500" />;
      case 'email':
        return <Mail className="w-4 h-4 text-green-500" />;
      case 'meeting':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      case 'deal-created':
        return <Target className="w-4 h-4 text-orange-500" />;
      case 'deal-won':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'deal-lost':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your sales today.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockSalesMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.label}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            period={metric.period}
            icon={
              index === 0 ? <DollarSign className="w-6 h-6 text-blue-600" /> :
              index === 1 ? <Target className="w-6 h-6 text-green-600" /> :
              index === 2 ? <TrendingUp className="w-6 h-6 text-purple-600" /> :
              <Users className="w-6 h-6 text-orange-600" />
            }
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-lg card-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value: number) => [formatCurrency(value), 'Revenue']} />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#colorRevenue)" strokeWidth={2} />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Distribution */}
        <div className="bg-white p-6 rounded-lg card-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPipelineData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ stage, count }) => `${stage} (${count})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockPipelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [formatCurrency(value), 'Value']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {mockActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-gray-500">{activity.customerName}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{activity.assignedTo}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-xs text-gray-400">
                  {formatTime(activity.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white p-6 rounded-lg card-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {mockTeamMembers
              .sort((a, b) => b.performance - a.performance)
              .slice(0, 4)
              .map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {member.avatar ? (
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={member.avatar}
                        alt={member.name}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                    <div className="mt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{formatCurrency(member.revenue)}</span>
                        <span className="font-medium text-gray-900">{member.performance}%</span>
                      </div>
                      <div className="mt-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${member.performance}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">This Month</p>
              <p className="text-2xl font-bold">32 Deals</p>
              <p className="text-blue-100 text-sm">+8% from last month</p>
            </div>
            <Target className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Win Rate</p>
              <p className="text-2xl font-bold">68%</p>
              <p className="text-green-100 text-sm">Industry avg: 52%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Pipeline Value</p>
              <p className="text-2xl font-bold">$2.4M</p>
              <p className="text-purple-100 text-sm">Across 45 deals</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;