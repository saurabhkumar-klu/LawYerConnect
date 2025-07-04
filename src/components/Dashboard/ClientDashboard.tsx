import React, { useState } from 'react';
import { Calendar, MessageCircle, FileText, Star, Clock, CheckCircle, AlertCircle, Search, Filter, Plus, TrendingUp } from 'lucide-react';
import { mockConsultations, mockLawyers } from '../../data/mockData';
import { motion } from 'framer-motion';
import Button from '../Common/Button';

const ClientDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'consultations' | 'messages' | 'documents' | 'reviews'>('consultations');
  const [searchTerm, setSearchTerm] = useState('');

  const upcomingConsultations = mockConsultations.filter(c => c.status === 'scheduled');
  const pastConsultations = mockConsultations.filter(c => c.status === 'completed');

  const stats = [
    {
      title: 'Upcoming',
      value: upcomingConsultations.length,
      icon: Calendar,
      color: 'blue',
      change: '+2 this week'
    },
    {
      title: 'Completed',
      value: pastConsultations.length,
      icon: CheckCircle,
      color: 'green',
      change: '+5 this month'
    },
    {
      title: 'Messages',
      value: 12,
      icon: MessageCircle,
      color: 'yellow',
      change: '3 unread'
    },
    {
      title: 'Documents',
      value: 8,
      icon: FileText,
      color: 'purple',
      change: '2 pending'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600'
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your legal consultations and documents</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="primary">
              <Plus className="h-5 w-5" />
              <span>Book Consultation</span>
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
            <div className="text-sm text-green-600 font-medium">{stat.change}</div>
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
              { id: 'consultations', label: 'Consultations', icon: Calendar },
              { id: 'messages', label: 'Messages', icon: MessageCircle },
              { id: 'documents', label: 'Documents', icon: FileText },
              { id: 'reviews', label: 'Reviews', icon: Star }
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
          {activeTab === 'consultations' && (
            <div className="space-y-8">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search consultations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <Button variant="secondary">
                  <Filter className="h-5 w-5" />
                  <span>Filter</span>
                </Button>
              </div>

              {/* Upcoming Consultations */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <span>Upcoming Consultations</span>
                </h3>
                {upcomingConsultations.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingConsultations.map((consultation) => {
                      const lawyer = mockLawyers.find(l => l.id === consultation.lawyerId);
                      return (
                        <motion.div 
                          key={consultation.id} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ scale: 1.01 }}
                          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-50 to-indigo-50"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={lawyer?.avatar}
                                alt={lawyer?.name}
                                className="w-16 h-16 rounded-xl object-cover shadow-lg"
                              />
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{lawyer?.name}</h4>
                                <p className="text-blue-600 font-medium">{lawyer?.specialties[0]}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>{consultation.date}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span>{consultation.time}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                consultation.type === 'video' ? 'bg-blue-100 text-blue-800' :
                                consultation.type === 'phone' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {consultation.type}
                              </span>
                              <Button variant="primary">
                                Join Now
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 bg-gray-50 rounded-xl"
                  >
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No upcoming consultations</h4>
                    <p className="text-gray-500 mb-6">Book your first consultation to get started</p>
                    <Button variant="primary">
                      Find Lawyers
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Past Consultations */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span>Past Consultations</span>
                </h3>
                {pastConsultations.length > 0 ? (
                  <div className="space-y-4">
                    {pastConsultations.map((consultation) => {
                      const lawyer = mockLawyers.find(l => l.id === consultation.lawyerId);
                      return (
                        <motion.div 
                          key={consultation.id} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          whileHover={{ scale: 1.01 }}
                          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={lawyer?.avatar}
                                alt={lawyer?.name}
                                className="w-16 h-16 rounded-xl object-cover shadow-lg"
                              />
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{lawyer?.name}</h4>
                                <p className="text-gray-600">{lawyer?.specialties[0]}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>{consultation.date}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-sm text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Completed</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Button variant="secondary">
                                Leave Review
                              </Button>
                              <Button variant="secondary">
                                Download Receipt
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 bg-gray-50 rounded-xl"
                  >
                    <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No past consultations</h4>
                    <p className="text-gray-500">Your completed consultations will appear here</p>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <MessageCircle className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Messages</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your conversations with lawyers will appear here. Start a consultation to begin messaging.
              </p>
              <Button variant="primary">
                Find Lawyers
              </Button>
            </motion.div>
          )}

          {activeTab === 'documents' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText className="h-20 w-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Documents</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your legal documents and case files will appear here. Upload and manage all your important documents securely.
              </p>
              <Button variant="primary">
                Upload Document
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your reviews and ratings will appear here. Help other clients by sharing your experience with lawyers.
              </p>
              <Button variant="primary">
                Write Review
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ClientDashboard;