import { Customer, Deal, Activity, TeamMember, SalesMetric, ChartData, PipelineStage, DashboardStats } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    status: 'active',
    value: 125000,
    createdAt: '2024-01-15',
    lastContact: '2024-01-20',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@innovate.com',
    phone: '+1 (555) 234-5678',
    company: 'Innovate Inc',
    status: 'prospect',
    value: 85000,
    createdAt: '2024-01-18',
    lastContact: '2024-01-19',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b407?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'm.brown@globaltech.com',
    phone: '+1 (555) 345-6789',
    company: 'Global Tech',
    status: 'active',
    value: 250000,
    createdAt: '2024-01-10',
    lastContact: '2024-01-21',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@startup.io',
    phone: '+1 (555) 456-7890',
    company: 'Startup Ventures',
    status: 'prospect',
    value: 45000,
    createdAt: '2024-01-22',
    lastContact: '2024-01-22',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@enterprise.com',
    phone: '+1 (555) 567-8901',
    company: 'Enterprise Solutions',
    status: 'active',
    value: 180000,
    createdAt: '2024-01-12',
    lastContact: '2024-01-20',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
  }
];

export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Q1 Software License Renewal',
    value: 125000,
    stage: 'negotiation',
    probability: 85,
    customerId: '1',
    customerName: 'TechCorp Solutions',
    expectedCloseDate: '2024-02-15',
    createdAt: '2024-01-15',
    assignedTo: 'Alex Thompson'
  },
  {
    id: '2',
    title: 'Digital Transformation Project',
    value: 85000,
    stage: 'proposal',
    probability: 60,
    customerId: '2',
    customerName: 'Innovate Inc',
    expectedCloseDate: '2024-02-28',
    createdAt: '2024-01-18',
    assignedTo: 'Sarah Miller'
  },
  {
    id: '3',
    title: 'Enterprise Security Suite',
    value: 250000,
    stage: 'qualification',
    probability: 40,
    customerId: '3',
    customerName: 'Global Tech',
    expectedCloseDate: '2024-03-15',
    createdAt: '2024-01-10',
    assignedTo: 'Mike Johnson'
  },
  {
    id: '4',
    title: 'Startup Package Deal',
    value: 45000,
    stage: 'prospecting',
    probability: 25,
    customerId: '4',
    customerName: 'Startup Ventures',
    expectedCloseDate: '2024-03-30',
    createdAt: '2024-01-22',
    assignedTo: 'Lisa Chen'
  },
  {
    id: '5',
    title: 'Cloud Migration Services',
    value: 180000,
    stage: 'closed-won',
    probability: 100,
    customerId: '5',
    customerName: 'Enterprise Solutions',
    expectedCloseDate: '2024-01-30',
    createdAt: '2024-01-12',
    assignedTo: 'Alex Thompson'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'deal-won',
    title: 'Deal Closed Successfully',
    description: 'Cloud Migration Services deal closed for $180,000',
    customerId: '5',
    customerName: 'Enterprise Solutions',
    dealId: '5',
    dealTitle: 'Cloud Migration Services',
    assignedTo: 'Alex Thompson',
    createdAt: '2024-01-21T10:30:00Z'
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Product Demo Meeting',
    description: 'Conducted product demonstration for Digital Transformation Project',
    customerId: '2',
    customerName: 'Innovate Inc',
    dealId: '2',
    dealTitle: 'Digital Transformation Project',
    assignedTo: 'Sarah Miller',
    createdAt: '2024-01-21T09:00:00Z'
  },
  {
    id: '3',
    type: 'call',
    title: 'Follow-up Call',
    description: 'Discussed contract terms and pricing for Q1 renewal',
    customerId: '1',
    customerName: 'TechCorp Solutions',
    dealId: '1',
    dealTitle: 'Q1 Software License Renewal',
    assignedTo: 'Alex Thompson',
    createdAt: '2024-01-20T14:15:00Z'
  },
  {
    id: '4',
    type: 'email',
    title: 'Proposal Sent',
    description: 'Sent detailed proposal for Enterprise Security Suite',
    customerId: '3',
    customerName: 'Global Tech',
    dealId: '3',
    dealTitle: 'Enterprise Security Suite',
    assignedTo: 'Mike Johnson',
    createdAt: '2024-01-20T11:45:00Z'
  },
  {
    id: '5',
    type: 'deal-created',
    title: 'New Deal Created',
    description: 'Created new deal for Startup Package',
    customerId: '4',
    customerName: 'Startup Ventures',
    dealId: '4',
    dealTitle: 'Startup Package Deal',
    assignedTo: 'Lisa Chen',
    createdAt: '2024-01-19T16:20:00Z'
  }
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex.thompson@company.com',
    role: 'Senior Sales Manager',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=32&h=32&fit=crop&crop=face',
    dealsCount: 12,
    revenue: 850000,
    target: 1000000,
    performance: 85
  },
  {
    id: '2',
    name: 'Sarah Miller',
    email: 'sarah.miller@company.com',
    role: 'Sales Representative',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=32&h=32&fit=crop&crop=face',
    dealsCount: 8,
    revenue: 420000,
    target: 500000,
    performance: 84
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'Account Executive',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=32&h=32&fit=crop&crop=face',
    dealsCount: 6,
    revenue: 320000,
    target: 400000,
    performance: 80
  },
  {
    id: '4',
    name: 'Lisa Chen',
    email: 'lisa.chen@company.com',
    role: 'Junior Sales Representative',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b407?w=32&h=32&fit=crop&crop=face',
    dealsCount: 4,
    revenue: 180000,
    target: 250000,
    performance: 72
  }
];

export const mockSalesMetrics: SalesMetric[] = [
  {
    label: 'Total Revenue',
    value: '$1,770,000',
    change: 12.5,
    trend: 'up',
    period: 'vs last month'
  },
  {
    label: 'New Deals',
    value: '24',
    change: 8.3,
    trend: 'up',
    period: 'this month'
  },
  {
    label: 'Conversion Rate',
    value: '68%',
    change: -2.1,
    trend: 'down',
    period: 'vs last month'
  },
  {
    label: 'Avg Deal Size',
    value: '$73,750',
    change: 15.7,
    trend: 'up',
    period: 'vs last quarter'
  }
];

export const mockRevenueData: ChartData[] = [
  { name: 'Jan', value: 1200000, deals: 18, customers: 45 },
  { name: 'Feb', value: 1350000, deals: 22, customers: 52 },
  { name: 'Mar', value: 1580000, deals: 25, customers: 58 },
  { name: 'Apr', value: 1420000, deals: 21, customers: 61 },
  { name: 'May', value: 1650000, deals: 28, customers: 67 },
  { name: 'Jun', value: 1770000, deals: 30, customers: 73 }
];

export const mockPipelineData: PipelineStage[] = [
  {
    stage: 'Prospecting',
    count: 15,
    value: 675000,
    deals: mockDeals.filter(deal => deal.stage === 'prospecting')
  },
  {
    stage: 'Qualification',
    count: 8,
    value: 850000,
    deals: mockDeals.filter(deal => deal.stage === 'qualification')
  },
  {
    stage: 'Proposal',
    count: 6,
    value: 420000,
    deals: mockDeals.filter(deal => deal.stage === 'proposal')
  },
  {
    stage: 'Negotiation',
    count: 4,
    value: 680000,
    deals: mockDeals.filter(deal => deal.stage === 'negotiation')
  },
  {
    stage: 'Closed Won',
    count: 12,
    value: 1770000,
    deals: mockDeals.filter(deal => deal.stage === 'closed-won')
  }
];

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 1770000,
  totalDeals: 45,
  totalCustomers: 73,
  conversionRate: 68,
  averageDealSize: 73750,
  monthlyGrowth: 12.5
};