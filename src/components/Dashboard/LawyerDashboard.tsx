import React, { useState } from 'react';
import { Calendar, MessageCircle, FileText, Star, Clock, CheckCircle, AlertCircle, Search, Filter, Plus, TrendingUp, Users, DollarSign, Award, BarChart3 } from 'lucide-react';
import { mockConsultations, mockLawyers } from '../../data/mockData';
import { motion } from 'framer-motion';
import Button from '../Common/Button';

const LawyerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'consultations' | 'clients' | 'earnings' | 'reviews'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const upcomingConsultations = mockConsultations.filter(c => c.status === 'scheduled');
  const completedConsultations = mockConsultations.filter(c => c.status === 'completed');

  const stats = [
    {
      title: 'Today\'s Consultations',
      value: 3,
      icon: Calendar,
      color: 'blue',
      change: '+2 from yesterday',
      trend: 'up'
    },
    {
      title: 'Total Clients',
      value: 127,
      icon: Users,
      color: 'green',
      change: '+12 this month',
      trend: 'up'
    },
    {
      title: 'Monthly Earnings',
      value: '₹45,280',
      icon: DollarSign,
      color: 'purple',
      change: '+18% from last month',
      trend: 'up'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      icon: Star,
      color: 'yellow',
      change: '+0.2 this month',
      trend: 'up'
    }
  ];

  const recentClients = [
    { id: 1, name: 'Rajesh Kumar', case: 'Property Dispute', status: 'Active', lastContact: '2 hours ago' },
    { id: 2, name: 'Priya Sharma', case: 'Divorce Proceedings', status: 'Pending', lastContact: '1 day ago' },
    { id: 3, name: 'Amit Patel', case: 'Business Contract', status: 'Completed', lastContact: '3 days ago' },
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Lawyer Dashboard</h1>
            <p className="text-gray-600">Manage your practice and client relationships</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="primary">
              <Plus className="h-5 w-5" />
              <span>Add Availability</span>
            </Button>
            <Button variant="primary">
              <MessageCircle className="h-5 w-5" />
              <span>Messages</span>
            </Button>
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
              { id: 'consultations', label: 'Consultations', icon: Calendar },
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'earnings', label: 'Earnings', icon: DollarSign },
              { id: 'reviews', label: 'Reviews', icon: Star }
            ].map((tab) => (
              <Button
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
              </Button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Today's Schedule */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span>Today's Schedule</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { time: '10:00 AM', client: 'Rajesh Kumar', type: 'Property Dispute', duration: '1 hour' },
                    { time: '2:00 PM', client: 'Priya Sharma', type: 'Family Law', duration: '45 mins' },
                    { time: '4:30 PM', client: 'Amit Patel', type: 'Business Contract', duration: '30 mins' }
                  ].map((appointment, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                          {appointment.time}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{appointment.client}</h4>
                          <p className="text-gray-600 text-sm">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{appointment.duration}</div>
                        <Button variant="primary">
                          Join Call
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Clients */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <Users className="h-6 w-6 text-green-600" />
                  <span>Recent Clients</span>
                </h3>
                <div className="space-y-4">
                  {recentClients.map((client, index) => (
                    <motion.div 
                      key={client.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{client.name}</h4>
                          <p className="text-gray-600 text-sm">{client.case}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          client.status === 'Active' ? 'bg-green-100 text-green-800' :
                          client.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {client.status}
                        </span>
                        <div className="text-sm text-gray-500 mt-1">{client.lastContact}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'consultations' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Calendar className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Consultation Management</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Manage your upcoming and past consultations, set availability, and track your schedule.
              </p>
              <Button variant="primary">
                Manage Schedule
              </Button>
            </motion.div>
          )}

          {activeTab === 'clients' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Users className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Client Management</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                View and manage your client relationships, case histories, and communication records.
              </p>
              <Button variant="primary">
                View All Clients
              </Button>
            </motion.div>
          )}

          {activeTab === 'earnings' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <DollarSign className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Earnings & Analytics</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Track your earnings, view payment history, and analyze your practice performance.
              </p>
              <Button variant="primary">
                View Earnings Report
              </Button>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Star className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reviews & Ratings</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                View client reviews, manage your reputation, and respond to feedback.
              </p>
              <Button variant="primary">
                Manage Reviews
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LawyerDashboard;