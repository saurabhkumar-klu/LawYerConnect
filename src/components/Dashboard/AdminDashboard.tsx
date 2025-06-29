import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Shield, AlertTriangle, CheckCircle, Clock, Star, BarChart3, Settings, UserCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'lawyers' | 'analytics' | 'reports' | 'settings'>('overview');

  const stats = [
    {
      title: 'Total Users',
      value: '25,847',
      icon: Users,
      color: 'blue',
      change: '+1,234 this month',
      trend: 'up'
    },
    {
      title: 'Active Lawyers',
      value: '1,456',
      icon: UserCheck,
      color: 'green',
      change: '+89 this month',
      trend: 'up'
    },
    {
      title: 'Platform Revenue',
      value: '₹12,45,680',
      icon: DollarSign,
      color: 'purple',
      change: '+18% from last month',
      trend: 'up'
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      icon: Star,
      color: 'yellow',
      change: '+2.1% this month',
      trend: 'up'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'user_registration', message: 'New client registered: Rajesh Kumar', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'lawyer_verification', message: 'Lawyer verification completed: Dr. Priya Sharma', time: '15 minutes ago', status: 'success' },
    { id: 3, type: 'payment_issue', message: 'Payment dispute reported by client', time: '1 hour ago', status: 'warning' },
    { id: 4, type: 'consultation_completed', message: '127 consultations completed today', time: '2 hours ago', status: 'info' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'Lawyer Verification', name: 'Amit Patel', submitted: '2 days ago', priority: 'high' },
    { id: 2, type: 'Document Review', name: 'Legal Certificate - Kavya Reddy', submitted: '1 day ago', priority: 'medium' },
    { id: 3, type: 'Dispute Resolution', name: 'Client Complaint #1234', submitted: '3 hours ago', priority: 'high' },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Platform management and analytics</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Alerts (3)</span>
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.title}</div>
              </div>
            </div>
            <div className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100"
      >
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'lawyers', label: 'Lawyers', icon: UserCheck },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'reports', label: 'Reports', icon: FileText },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activities */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <span>Recent Activities</span>
                </h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div 
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl"
                    >
                      {getStatusIcon(activity.status)}
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{activity.message}</p>
                        <p className="text-gray-500 text-sm">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pending Approvals */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  <span>Pending Approvals</span>
                </h3>
                <div className="space-y-4">
                  {pendingApprovals.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.type}</h4>
                        <p className="text-gray-600 text-sm">{item.name}</p>
                        <p className="text-gray-500 text-xs">{item.submitted}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.priority === 'high' ? 'bg-red-100 text-red-800' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Review
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Users className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">User Management</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Manage all platform users, view user analytics, and handle user-related issues.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Manage Users
              </button>
            </motion.div>
          )}

          {activeTab === 'lawyers' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <UserCheck className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lawyer Management</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Verify lawyers, manage profiles, and oversee lawyer performance and compliance.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Manage Lawyers
              </button>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <TrendingUp className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Platform Analytics</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                View detailed analytics, performance metrics, and business intelligence reports.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                View Analytics
              </button>
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reports & Compliance</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Generate reports, manage compliance, and export data for regulatory purposes.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Generate Reports
              </button>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Settings className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Platform Settings</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Configure platform settings, manage integrations, and update system preferences.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                Manage Settings
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;