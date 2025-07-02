import React from 'react';
import { TrendingUp, Users, DollarSign, Star, Clock, Target, Award, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Analytics } from '../../types';

interface AnalyticsDashboardProps {
  analytics: Analytics;
  userRole: 'client' | 'lawyer' | 'admin';
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ analytics, userRole }) => {
  const getMetrics = () => {
    switch (userRole) {
      case 'lawyer':
        return [
          {
            title: 'Total Consultations',
            value: analytics.totalConsultations,
            icon: Calendar,
            color: 'blue',
            change: '+12%'
          },
          {
            title: 'Total Revenue',
            value: `₹${analytics.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'green',
            change: '+8%'
          },
          {
            title: 'Average Rating',
            value: analytics.averageRating.toFixed(1),
            icon: Star,
            color: 'yellow',
            change: '+0.2'
          },
          {
            title: 'Response Time',
            value: `${analytics.responseTime}min`,
            icon: Clock,
            color: 'purple',
            change: '-5min'
          }
        ];
      case 'client':
        return [
          {
            title: 'Consultations',
            value: analytics.totalConsultations,
            icon: Calendar,
            color: 'blue',
            change: '+3'
          },
          {
            title: 'Total Spent',
            value: `₹${analytics.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: 'green',
            change: '+₹2,500'
          },
          {
            title: 'Satisfaction',
            value: `${analytics.userSatisfaction}%`,
            icon: Star,
            color: 'yellow',
            change: '+5%'
          },
          {
            title: 'Cases Resolved',
            value: '12',
            icon: Award,
            color: 'purple',
            change: '+2'
          }
        ];
      case 'admin':
        return [
          {
            title: 'Total Users',
            value: '25,847',
            icon: Users,
            color: 'blue',
            change: '+1,234'
          },
          {
            title: 'Platform Revenue',
            value: `₹${(analytics.totalRevenue * 0.1).toLocaleString()}`,
            icon: DollarSign,
            color: 'green',
            change: '+15%'
          },
          {
            title: 'Success Rate',
            value: `${analytics.userSatisfaction}%`,
            icon: Target,
            color: 'yellow',
            change: '+2%'
          },
          {
            title: 'Growth Rate',
            value: `${analytics.monthlyGrowth}%`,
            icon: TrendingUp,
            color: 'purple',
            change: '+3%'
          }
        ];
      default:
        return [];
    }
  };

  const metrics = getMetrics();

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClasses(metric.color)}`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded-full">
                {metric.change}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {metric.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {metric.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Specialties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Popular Specialties
          </h3>
          <div className="space-y-3">
            {analytics.popularSpecialties.map((specialty) => (
              <div key={specialty.specialty} className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">{specialty.specialty}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(specialty.count / Math.max(...analytics.popularSpecialties.map(s => s.count))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                    {specialty.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Client Retention</span>
              <span className="text-lg font-semibold text-green-600">
                {analytics.clientRetention}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">User Satisfaction</span>
              <span className="text-lg font-semibold text-blue-600">
                {analytics.userSatisfaction}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Monthly Growth</span>
              <span className="text-lg font-semibold text-purple-600">
                +{analytics.monthlyGrowth}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Avg Response Time</span>
              <span className="text-lg font-semibold text-orange-600">
                {analytics.responseTime}min
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;