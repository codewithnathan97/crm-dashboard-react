import React, { useState } from 'react';
import {
  Search,
  User,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Monitor,
  Zap,
  Users,
  Save,
  X,
  Check,
  Eye,
  EyeOff,
  Camera,
  Key,
  Smartphone,
  Globe,
  Clock,
  Trash2,
  Plus,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Loader2
} from 'lucide-react';
import {
  UserProfile,
  NotificationSettings,
  SecuritySettings,
  DashboardPreferences,
  IntegrationSettings,
  TeamSettings
} from '../types';

interface SettingsSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  icon,
  children,
  isExpanded = true,
  onToggle
}) => {
  return (
    <div className="bg-white rounded-lg card-shadow overflow-hidden">
      <div 
        className={`p-6 border-b border-gray-200 ${onToggle ? 'cursor-pointer hover:bg-gray-50' : ''}`}
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          {onToggle && (
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </div>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="p-6">
          {children}
        </div>
      )}
    </div>
  );
};

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-900">{label}</label>
        {description && (
          <p className="text-xs text-gray-600 mt-1">{description}</p>
        )}
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

interface SaveButtonProps {
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
  hasChanges?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  onSave,
  onCancel,
  isSaving = false,
  hasChanges = false
}) => {
  if (!hasChanges) return null;

  return (
    <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
      <button
        onClick={onSave}
        disabled={isSaving}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </>
        )}
      </button>
      <button
        onClick={onCancel}
        disabled={isSaving}
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <X className="w-4 h-4 mr-2" />
        Cancel
      </button>
    </div>
  );
};

const Settings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    profile: true,
    account: true,
    notifications: true,
    security: false,
    dashboard: false,
    integrations: false,
    team: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState<Record<string, boolean>>({});

  // Mock data for demonstration
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    title: 'Sales Manager',
    company: 'Acme Corporation',
    bio: 'Experienced sales professional with 8+ years in CRM and lead management.',
    timezone: 'America/New_York',
    language: 'en-US',
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: {
      newDeals: true,
      dealUpdates: true,
      taskReminders: true,
      systemAlerts: true,
      weeklyReports: false,
      marketingEmails: false,
    },
    pushNotifications: {
      realTimeUpdates: true,
      mobileAlerts: false,
      browserNotifications: true,
    },
    alertPreferences: {
      soundEnabled: true,
      quietHours: true,
      quietHoursStart: '22:00',
      quietHoursEnd: '08:00',
    },
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    sessionTimeout: 3600,
    passwordLastChanged: '2024-01-15',
    activeSessions: [
      {
        id: '1',
        device: 'MacBook Pro - Chrome',
        location: 'New York, NY',
        lastActive: '2024-01-20T10:30:00Z',
        current: true,
      },
      {
        id: '2',
        device: 'iPhone 15 - Safari',
        location: 'New York, NY',
        lastActive: '2024-01-19T18:45:00Z',
        current: false,
      },
    ],
    loginHistory: [
      {
        id: '1',
        timestamp: '2024-01-20T10:30:00Z',
        location: 'New York, NY',
        device: 'MacBook Pro',
        success: true,
      },
      {
        id: '2',
        timestamp: '2024-01-19T18:45:00Z',
        location: 'New York, NY',
        device: 'iPhone 15',
        success: true,
      },
    ],
  });

  const [dashboardPrefs, setDashboardPrefs] = useState<DashboardPreferences>({
    defaultView: 'overview',
    dataRefreshInterval: 300,
    chartsTheme: 'auto',
    showWelcomeMessage: true,
    compactMode: false,
    showQuickActions: true,
    widgetOrder: ['metrics', 'charts', 'activities', 'performers'],
  });

  const [integrations, setIntegrations] = useState<IntegrationSettings>({
    apiKeys: [
      {
        id: '1',
        name: 'CRM API Key',
        key: 'sk-1234...abcd',
        lastUsed: '2024-01-19T14:30:00Z',
        status: 'active',
      },
    ],
    connectedApps: [
      {
        id: '1',
        name: 'Google Calendar',
        type: 'calendar',
        connected: true,
        lastSync: '2024-01-20T09:15:00Z',
        permissions: ['read_events', 'write_events'],
      },
      {
        id: '2',
        name: 'Slack',
        type: 'productivity',
        connected: false,
        lastSync: '',
        permissions: ['send_messages', 'read_channels'],
      },
    ],
    webhooks: [
      {
        id: '1',
        url: 'https://api.company.com/webhooks/deals',
        events: ['deal.created', 'deal.updated', 'deal.closed'],
        status: 'active',
        lastTriggered: '2024-01-20T08:22:00Z',
      },
    ],
  });

  const [teamSettings, setTeamSettings] = useState<TeamSettings>({
    users: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@company.com',
        role: 'admin',
        status: 'active',
        lastLogin: '2024-01-20T10:30:00Z',
        permissions: ['all'],
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        role: 'manager',
        status: 'active',
        lastLogin: '2024-01-19T16:45:00Z',
        permissions: ['manage_deals', 'view_reports'],
      },
    ],
    roles: [
      { id: '1', name: 'Admin', permissions: ['all'], userCount: 1 },
      { id: '2', name: 'Manager', permissions: ['manage_deals', 'view_reports'], userCount: 1 },
      { id: '3', name: 'Sales Rep', permissions: ['manage_own_deals'], userCount: 3 },
    ],
    invitations: [
      {
        id: '1',
        email: 'newuser@company.com',
        role: 'sales_rep',
        sentAt: '2024-01-18T14:20:00Z',
        status: 'pending',
      },
    ],
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = async (section: string) => {
    setSavingStates(prev => ({ ...prev, [section]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSavingStates(prev => ({ ...prev, [section]: false }));
    setHasChanges(prev => ({ ...prev, [section]: false }));
  };

  const handleCancel = (section: string) => {
    setHasChanges(prev => ({ ...prev, [section]: false }));
    // Reset form data here
  };

  const markAsChanged = (section: string) => {
    setHasChanges(prev => ({ ...prev, [section]: true }));
  };

  const filteredSections = [
    { id: 'profile', title: 'Profile Settings', visible: true },
    { id: 'account', title: 'Account Settings', visible: true },
    { id: 'notifications', title: 'Notification Settings', visible: true },
    { id: 'security', title: 'Security Settings', visible: true },
    { id: 'dashboard', title: 'Dashboard Settings', visible: true },
    { id: 'integrations', title: 'Integration Settings', visible: true },
    { id: 'team', title: 'Team Settings', visible: true },
  ].filter(section => 
    searchTerm === '' || 
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and system configurations.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search settings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {filteredSections.map(section => {
          switch (section.id) {
            case 'profile':
              return (
                <SettingsSection
                  key="profile"
                  title="Profile Settings"
                  description="Manage your personal information and preferences"
                  icon={<User className="w-5 h-5 text-blue-600" />}
                  isExpanded={expandedSections.profile}
                  onToggle={() => toggleSection('profile')}
                >
                  <div className="space-y-6">
                    {/* Avatar Upload */}
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-semibold text-white">
                            {userProfile.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <Camera className="w-4 h-4 mr-2" />
                          Change Avatar
                        </button>
                        <p className="text-sm text-gray-500 mt-1">JPG, PNG, or GIF. Max 2MB.</p>
                      </div>
                    </div>

                    {/* Profile Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={userProfile.name}
                          onChange={(e) => {
                            setUserProfile(prev => ({ ...prev, name: e.target.value }));
                            markAsChanged('profile');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => {
                            setUserProfile(prev => ({ ...prev, email: e.target.value }));
                            markAsChanged('profile');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) => {
                            setUserProfile(prev => ({ ...prev, phone: e.target.value }));
                            markAsChanged('profile');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                        <input
                          type="text"
                          value={userProfile.title}
                          onChange={(e) => {
                            setUserProfile(prev => ({ ...prev, title: e.target.value }));
                            markAsChanged('profile');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                        <input
                          type="text"
                          value={userProfile.company}
                          onChange={(e) => {
                            setUserProfile(prev => ({ ...prev, company: e.target.value }));
                            markAsChanged('profile');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea
                          rows={3}
                          value={userProfile.bio || ''}
                          onChange={(e) => {
                            setUserProfile(prev => ({ ...prev, bio: e.target.value }));
                            markAsChanged('profile');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>

                    <SaveButton
                      onSave={() => handleSave('profile')}
                      onCancel={() => handleCancel('profile')}
                      isSaving={savingStates.profile}
                      hasChanges={hasChanges.profile}
                    />
                  </div>
                </SettingsSection>
              );

            case 'account':
              return (
                <SettingsSection
                  key="account"
                  title="Account Settings"
                  description="Configure your account preferences and regional settings"
                  icon={<SettingsIcon className="w-5 h-5 text-blue-600" />}
                  isExpanded={expandedSections.account}
                  onToggle={() => toggleSection('account')}
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Globe className="w-4 h-4 inline mr-2" />
                          Language
                        </label>
                        <select
                          value={userProfile.language}
                          onChange={(e) => {
                            setUserProfile(prev => ({ ...prev, language: e.target.value }));
                            markAsChanged('account');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="en-US">English (US)</option>
                          <option value="en-GB">English (UK)</option>
                          <option value="es-ES">Spanish</option>
                          <option value="fr-FR">French</option>
                          <option value="de-DE">German</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Timezone
                        </label>
                        <select
                          value={userProfile.timezone}
                          onChange={(e) => {
                            setUserProfile(prev => ({ ...prev, timezone: e.target.value }));
                            markAsChanged('account');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                          <option value="Europe/Paris">Central European Time (CET)</option>
                        </select>
                      </div>
                    </div>

                    <SaveButton
                      onSave={() => handleSave('account')}
                      onCancel={() => handleCancel('account')}
                      isSaving={savingStates.account}
                      hasChanges={hasChanges.account}
                    />
                  </div>
                </SettingsSection>
              );

            case 'notifications':
              return (
                <SettingsSection
                  key="notifications"
                  title="Notification Settings"
                  description="Control how and when you receive notifications"
                  icon={<Bell className="w-5 h-5 text-blue-600" />}
                  isExpanded={expandedSections.notifications}
                  onToggle={() => toggleSection('notifications')}
                >
                  <div className="space-y-8">
                    {/* Email Notifications */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h4>
                      <div className="space-y-1">
                        <ToggleSwitch
                          checked={notifications.emailNotifications.newDeals}
                          onChange={(checked) => {
                            setNotifications(prev => ({
                              ...prev,
                              emailNotifications: { ...prev.emailNotifications, newDeals: checked }
                            }));
                            markAsChanged('notifications');
                          }}
                          label="New Deals"
                          description="Get notified when new deals are created"
                        />
                        <ToggleSwitch
                          checked={notifications.emailNotifications.dealUpdates}
                          onChange={(checked) => {
                            setNotifications(prev => ({
                              ...prev,
                              emailNotifications: { ...prev.emailNotifications, dealUpdates: checked }
                            }));
                            markAsChanged('notifications');
                          }}
                          label="Deal Updates"
                          description="Receive updates when deals progress through the pipeline"
                        />
                        <ToggleSwitch
                          checked={notifications.emailNotifications.taskReminders}
                          onChange={(checked) => {
                            setNotifications(prev => ({
                              ...prev,
                              emailNotifications: { ...prev.emailNotifications, taskReminders: checked }
                            }));
                            markAsChanged('notifications');
                          }}
                          label="Task Reminders"
                          description="Get reminders for upcoming tasks and follow-ups"
                        />
                        <ToggleSwitch
                          checked={notifications.emailNotifications.systemAlerts}
                          onChange={(checked) => {
                            setNotifications(prev => ({
                              ...prev,
                              emailNotifications: { ...prev.emailNotifications, systemAlerts: checked }
                            }));
                            markAsChanged('notifications');
                          }}
                          label="System Alerts"
                          description="Important system notifications and security alerts"
                        />
                        <ToggleSwitch
                          checked={notifications.emailNotifications.weeklyReports}
                          onChange={(checked) => {
                            setNotifications(prev => ({
                              ...prev,
                              emailNotifications: { ...prev.emailNotifications, weeklyReports: checked }
                            }));
                            markAsChanged('notifications');
                          }}
                          label="Weekly Reports"
                          description="Receive weekly performance summaries"
                        />
                        <ToggleSwitch
                          checked={notifications.emailNotifications.marketingEmails}
                          onChange={(checked) => {
                            setNotifications(prev => ({
                              ...prev,
                              emailNotifications: { ...prev.emailNotifications, marketingEmails: checked }
                            }));
                            markAsChanged('notifications');
                          }}
                          label="Marketing Emails"
                          description="Product updates and marketing communications"
                        />
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h4>
                      <div className="space-y-1">
                        <ToggleSwitch
                          checked={notifications.pushNotifications.realTimeUpdates}
                          onChange={(checked) => {
                            setNotifications(prev => ({
                              ...prev,
                              pushNotifications: { ...prev.pushNotifications, realTimeUpdates: checked }
                            }));
                            markAsChanged('notifications');
                          }}
                          label="Real-time Updates"
                          description="Instant notifications for important events"
                        />
                        <ToggleSwitch
                          checked={notifications.pushNotifications.mobileAlerts}
                          onChange={(checked) => {
                            setNotifications(prev => ({
                              ...prev,
                              pushNotifications: { ...prev.pushNotifications, mobileAlerts: checked }
                            }));
                            markAsChanged('notifications');
                          }}
                          label="Mobile Alerts"
                          description="Push notifications to your mobile device"
                        />
                        <ToggleSwitch
                          checked={notifications.pushNotifications.browserNotifications}
                          onChange={(checked) => {
                            setNotifications(prev => ({
                              ...prev,
                              pushNotifications: { ...prev.pushNotifications, browserNotifications: checked }
                            }));
                            markAsChanged('notifications');
                          }}
                          label="Browser Notifications"
                          description="Show notifications in your web browser"
                        />
                      </div>
                    </div>

                    {/* Alert Preferences */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Alert Preferences</h4>
                      <div className="space-y-4">
                        <ToggleSwitch
                          checked={notifications.alertPreferences.soundEnabled}
                          onChange={(checked) => {
                            setNotifications(prev => ({
                              ...prev,
                              alertPreferences: { ...prev.alertPreferences, soundEnabled: checked }
                            }));
                            markAsChanged('notifications');
                          }}
                          label="Sound Notifications"
                          description="Play sound with notifications"
                        />
                        <ToggleSwitch
                          checked={notifications.alertPreferences.quietHours}
                          onChange={(checked) => {
                            setNotifications(prev => ({
                              ...prev,
                              alertPreferences: { ...prev.alertPreferences, quietHours: checked }
                            }));
                            markAsChanged('notifications');
                          }}
                          label="Quiet Hours"
                          description="Disable notifications during specified hours"
                        />
                        {notifications.alertPreferences.quietHours && (
                          <div className="grid grid-cols-2 gap-4 pl-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                              <input
                                type="time"
                                value={notifications.alertPreferences.quietHoursStart}
                                onChange={(e) => {
                                  setNotifications(prev => ({
                                    ...prev,
                                    alertPreferences: { ...prev.alertPreferences, quietHoursStart: e.target.value }
                                  }));
                                  markAsChanged('notifications');
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                              <input
                                type="time"
                                value={notifications.alertPreferences.quietHoursEnd}
                                onChange={(e) => {
                                  setNotifications(prev => ({
                                    ...prev,
                                    alertPreferences: { ...prev.alertPreferences, quietHoursEnd: e.target.value }
                                  }));
                                  markAsChanged('notifications');
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <SaveButton
                      onSave={() => handleSave('notifications')}
                      onCancel={() => handleCancel('notifications')}
                      isSaving={savingStates.notifications}
                      hasChanges={hasChanges.notifications}
                    />
                  </div>
                </SettingsSection>
              );

            case 'security':
              return (
                <SettingsSection
                  key="security"
                  title="Security Settings"
                  description="Manage your account security and access controls"
                  icon={<Shield className="w-5 h-5 text-blue-600" />}
                  isExpanded={expandedSections.security}
                  onToggle={() => toggleSection('security')}
                >
                  <div className="space-y-8">
                    {/* Password Section */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Password & Authentication</h4>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Password last changed</p>
                            <p className="text-sm text-gray-600">January 15, 2024</p>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Change Password
                          </button>
                        </div>
                      </div>

                      <ToggleSwitch
                        checked={security.twoFactorEnabled}
                        onChange={(checked) => {
                          setSecurity(prev => ({ ...prev, twoFactorEnabled: checked }));
                          markAsChanged('security');
                        }}
                        label="Two-Factor Authentication"
                        description="Add an extra layer of security with 2FA"
                      />
                    </div>

                    {/* Session Management */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Session Management</h4>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout</label>
                        <select
                          value={security.sessionTimeout}
                          onChange={(e) => {
                            setSecurity(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }));
                            markAsChanged('security');
                          }}
                          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value={1800}>30 minutes</option>
                          <option value={3600}>1 hour</option>
                          <option value={7200}>2 hours</option>
                          <option value={28800}>8 hours</option>
                          <option value={86400}>24 hours</option>
                        </select>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <h5 className="text-sm font-medium text-gray-900">Active Sessions</h5>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {security.activeSessions.map((session) => (
                            <div key={session.id} className="px-4 py-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-2 h-2 rounded-full ${
                                    session.current ? 'bg-green-400' : 'bg-gray-300'
                                  }`} />
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {session.device}
                                      {session.current && <span className="ml-2 text-xs text-green-600">(Current)</span>}
                                    </p>
                                    <p className="text-xs text-gray-600">{session.location} • Last active: {new Date(session.lastActive).toLocaleString()}</p>
                                  </div>
                                </div>
                                {!session.current && (
                                  <button className="text-sm text-red-600 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <SaveButton
                      onSave={() => handleSave('security')}
                      onCancel={() => handleCancel('security')}
                      isSaving={savingStates.security}
                      hasChanges={hasChanges.security}
                    />
                  </div>
                </SettingsSection>
              );

            case 'dashboard':
              return (
                <SettingsSection
                  key="dashboard"
                  title="Dashboard Settings"
                  description="Customize your dashboard appearance and behavior"
                  icon={<Monitor className="w-5 h-5 text-blue-600" />}
                  isExpanded={expandedSections.dashboard}
                  onToggle={() => toggleSection('dashboard')}
                >
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
                        <select
                          value={dashboardPrefs.defaultView}
                          onChange={(e) => {
                            setDashboardPrefs(prev => ({ ...prev, defaultView: e.target.value as any }));
                            markAsChanged('dashboard');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="overview">Overview</option>
                          <option value="metrics">Metrics</option>
                          <option value="pipeline">Pipeline</option>
                          <option value="activities">Activities</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Data Refresh Interval</label>
                        <select
                          value={dashboardPrefs.dataRefreshInterval}
                          onChange={(e) => {
                            setDashboardPrefs(prev => ({ ...prev, dataRefreshInterval: parseInt(e.target.value) as any }));
                            markAsChanged('dashboard');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value={30}>30 seconds</option>
                          <option value={60}>1 minute</option>
                          <option value={300}>5 minutes</option>
                          <option value={900}>15 minutes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Charts Theme</label>
                        <select
                          value={dashboardPrefs.chartsTheme}
                          onChange={(e) => {
                            setDashboardPrefs(prev => ({ ...prev, chartsTheme: e.target.value as any }));
                            markAsChanged('dashboard');
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <ToggleSwitch
                        checked={dashboardPrefs.showWelcomeMessage}
                        onChange={(checked) => {
                          setDashboardPrefs(prev => ({ ...prev, showWelcomeMessage: checked }));
                          markAsChanged('dashboard');
                        }}
                        label="Show Welcome Message"
                        description="Display welcome message on dashboard"
                      />
                      <ToggleSwitch
                        checked={dashboardPrefs.compactMode}
                        onChange={(checked) => {
                          setDashboardPrefs(prev => ({ ...prev, compactMode: checked }));
                          markAsChanged('dashboard');
                        }}
                        label="Compact Mode"
                        description="Use smaller cards and reduced spacing"
                      />
                      <ToggleSwitch
                        checked={dashboardPrefs.showQuickActions}
                        onChange={(checked) => {
                          setDashboardPrefs(prev => ({ ...prev, showQuickActions: checked }));
                          markAsChanged('dashboard');
                        }}
                        label="Show Quick Actions"
                        description="Display quick action buttons on dashboard"
                      />
                    </div>

                    <SaveButton
                      onSave={() => handleSave('dashboard')}
                      onCancel={() => handleCancel('dashboard')}
                      isSaving={savingStates.dashboard}
                      hasChanges={hasChanges.dashboard}
                    />
                  </div>
                </SettingsSection>
              );

            case 'integrations':
              return (
                <SettingsSection
                  key="integrations"
                  title="Integration Settings"
                  description="Manage API keys, connected apps, and webhooks"
                  icon={<Zap className="w-5 h-5 text-blue-600" />}
                  isExpanded={expandedSections.integrations}
                  onToggle={() => toggleSection('integrations')}
                >
                  <div className="space-y-8">
                    {/* API Keys */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900">API Keys</h4>
                        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <Plus className="w-4 h-4 mr-1" />
                          Generate Key
                        </button>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg">
                        {integrations.apiKeys.map((apiKey) => (
                          <div key={apiKey.id} className="px-4 py-3 border-b border-gray-200 last:border-b-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{apiKey.name}</p>
                                <p className="text-xs text-gray-600 font-mono">{apiKey.key}</p>
                                <p className="text-xs text-gray-500 mt-1">Last used: {new Date(apiKey.lastUsed).toLocaleString()}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  apiKey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {apiKey.status}
                                </span>
                                <button className="text-gray-400 hover:text-red-600">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Connected Apps */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Connected Apps</h4>
                      <div className="space-y-4">
                        {integrations.connectedApps.map((app) => (
                          <div key={app.id} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-blue-600" />
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{app.name}</p>
                                  <p className="text-xs text-gray-600 capitalize">{app.type}</p>
                                  {app.connected && app.lastSync && (
                                    <p className="text-xs text-gray-500">Last sync: {new Date(app.lastSync).toLocaleString()}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  app.connected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {app.connected ? 'Connected' : 'Disconnected'}
                                </span>
                                <button className={`px-3 py-1 text-sm rounded-md ${
                                  app.connected 
                                    ? 'text-red-600 hover:text-red-700 border border-red-300 hover:bg-red-50'
                                    : 'text-white bg-blue-600 hover:bg-blue-700'
                                }`}>
                                  {app.connected ? 'Disconnect' : 'Connect'}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Webhooks */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900">Webhooks</h4>
                        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Webhook
                        </button>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg">
                        {integrations.webhooks.map((webhook) => (
                          <div key={webhook.id} className="px-4 py-3 border-b border-gray-200 last:border-b-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900 font-mono">{webhook.url}</p>
                                <p className="text-xs text-gray-600">Events: {webhook.events.join(', ')}</p>
                                <p className="text-xs text-gray-500 mt-1">Last triggered: {new Date(webhook.lastTriggered).toLocaleString()}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  webhook.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {webhook.status}
                                </span>
                                <button className="text-gray-400 hover:text-red-600">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <SaveButton
                      onSave={() => handleSave('integrations')}
                      onCancel={() => handleCancel('integrations')}
                      isSaving={savingStates.integrations}
                      hasChanges={hasChanges.integrations}
                    />
                  </div>
                </SettingsSection>
              );

            case 'team':
              return (
                <SettingsSection
                  key="team"
                  title="Team Settings"
                  description="Manage users, roles, and permissions"
                  icon={<Users className="w-5 h-5 text-blue-600" />}
                  isExpanded={expandedSections.team}
                  onToggle={() => toggleSection('team')}
                >
                  <div className="space-y-8">
                    {/* Team Members */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900">Team Members</h4>
                        <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          <Plus className="w-4 h-4 mr-1" />
                          Invite User
                        </button>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg">
                        {teamSettings.users.map((user) => (
                          <div key={user.id} className="px-4 py-3 border-b border-gray-200 last:border-b-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-semibold text-white">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                  <p className="text-xs text-gray-600">{user.email}</p>
                                  <p className="text-xs text-gray-500">Last login: {new Date(user.lastLogin).toLocaleString()}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                  user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                  user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {user.role.replace('_', ' ')}
                                </span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.status === 'active' ? 'bg-green-100 text-green-800' :
                                  user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {user.status}
                                </span>
                                {user.role !== 'admin' && (
                                  <button className="text-gray-400 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pending Invitations */}
                    {teamSettings.invitations.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Pending Invitations</h4>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg">
                          {teamSettings.invitations.map((invitation) => (
                            <div key={invitation.id} className="px-4 py-3 border-b border-yellow-200 last:border-b-0">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{invitation.email}</p>
                                  <p className="text-xs text-gray-600">
                                    Role: {invitation.role.replace('_', ' ')} • Sent: {new Date(invitation.sentAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button className="text-sm text-blue-600 hover:text-blue-700">Resend</button>
                                  <button className="text-sm text-red-600 hover:text-red-700">Cancel</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <SaveButton
                      onSave={() => handleSave('team')}
                      onCancel={() => handleCancel('team')}
                      isSaving={savingStates.team}
                      hasChanges={hasChanges.team}
                    />
                  </div>
                </SettingsSection>
              );

            default:
              return null;
          }
        })}
      </div>

      {filteredSections.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No settings found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Settings;