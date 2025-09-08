export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
  value: number;
  createdAt: string;
  lastContact: string;
  avatar?: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  customerId: string;
  customerName: string;
  expectedCloseDate: string;
  createdAt: string;
  assignedTo: string;
}

export interface SalesMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  period: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'deal-created' | 'deal-won' | 'deal-lost';
  title: string;
  description: string;
  customerId?: string;
  customerName?: string;
  dealId?: string;
  dealTitle?: string;
  assignedTo: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  dealsCount: number;
  revenue: number;
  target: number;
  performance: number;
}

export interface ChartData {
  name: string;
  value: number;
  revenue?: number;
  deals?: number;
  customers?: number;
}

export interface PipelineStage {
  stage: string;
  count: number;
  value: number;
  deals: Deal[];
}

export interface DashboardStats {
  totalRevenue: number;
  totalDeals: number;
  totalCustomers: number;
  conversionRate: number;
  averageDealSize: number;
  monthlyGrowth: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  avatar?: string;
  bio?: string;
  timezone: string;
  language: string;
}

export interface NotificationSettings {
  emailNotifications: {
    newDeals: boolean;
    dealUpdates: boolean;
    taskReminders: boolean;
    systemAlerts: boolean;
    weeklyReports: boolean;
    marketingEmails: boolean;
  };
  pushNotifications: {
    realTimeUpdates: boolean;
    mobileAlerts: boolean;
    browserNotifications: boolean;
  };
  alertPreferences: {
    soundEnabled: boolean;
    quietHours: boolean;
    quietHoursStart: string;
    quietHoursEnd: string;
  };
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number;
  passwordLastChanged: string;
  activeSessions: Array<{
    id: string;
    device: string;
    location: string;
    lastActive: string;
    current: boolean;
  }>;
  loginHistory: Array<{
    id: string;
    timestamp: string;
    location: string;
    device: string;
    success: boolean;
  }>;
}

export interface DashboardPreferences {
  defaultView: 'overview' | 'metrics' | 'pipeline' | 'activities';
  dataRefreshInterval: 30 | 60 | 300 | 900; // seconds
  chartsTheme: 'light' | 'dark' | 'auto';
  showWelcomeMessage: boolean;
  compactMode: boolean;
  showQuickActions: boolean;
  widgetOrder: string[];
}

export interface IntegrationSettings {
  apiKeys: Array<{
    id: string;
    name: string;
    key: string;
    lastUsed: string;
    status: 'active' | 'inactive';
  }>;
  connectedApps: Array<{
    id: string;
    name: string;
    type: 'email' | 'calendar' | 'social' | 'productivity' | 'analytics';
    connected: boolean;
    lastSync: string;
    permissions: string[];
  }>;
  webhooks: Array<{
    id: string;
    url: string;
    events: string[];
    status: 'active' | 'inactive';
    lastTriggered: string;
  }>;
}

export interface TeamSettings {
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'manager' | 'sales_rep' | 'viewer';
    status: 'active' | 'inactive' | 'pending';
    lastLogin: string;
    permissions: string[];
  }>;
  roles: Array<{
    id: string;
    name: string;
    permissions: string[];
    userCount: number;
  }>;
  invitations: Array<{
    id: string;
    email: string;
    role: string;
    sentAt: string;
    status: 'pending' | 'expired';
  }>;
}