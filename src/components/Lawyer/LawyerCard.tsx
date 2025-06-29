import React from 'react';
import { Star, MapPin, Clock, Verified, MessageCircle, Calendar, Award, TrendingUp } from 'lucide-react';
import { Lawyer } from '../../types';
import { motion } from 'framer-motion';

interface LawyerCardProps {
  lawyer: Lawyer;
  onViewProfile: (lawyer: Lawyer) => void;
  onBookConsultation: (lawyer: Lawyer) => void;
  onSendMessage: (lawyer: Lawyer) => void;
}

const LawyerCard: React.FC<LawyerCardProps> = ({
  lawyer,
  onViewProfile,
  onBookConsultation,
  onSendMessage
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 relative"
    >
      {/* Premium Badge */}
      {lawyer.rating >= 4.8 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Award className="h-3 w-3" />
            <span>TOP RATED</span>
          </div>
        </div>
      )}

      {/* Online Status */}
      {lawyer.isOnline && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>ONLINE</span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="relative">
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              src={lawyer.avatar}
              alt={lawyer.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-lg"
            />
            {lawyer.verified && (
              <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1.5 shadow-lg">
                <Verified className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {lawyer.name}
              </h3>
              {lawyer.verified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Verified
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-semibold text-gray-900">{lawyer.rating}</span>
                <span>({lawyer.reviewCount})</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{lawyer.experience}y exp</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{lawyer.location}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              ₹{lawyer.hourlyRate}
            </div>
            <div className="text-sm text-gray-600">per hour</div>
            {lawyer.hourlyRate < 300 && (
              <div className="text-xs text-green-600 font-semibold mt-1">
                Great Value!
              </div>
            )}
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {lawyer.specialties.slice(0, 2).map((specialty) => (
              <span
                key={specialty}
                className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
              >
                {specialty}
              </span>
            ))}
            {lawyer.specialties.length > 2 && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-700">
                +{lawyer.specialties.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{lawyer.reviewCount}</div>
            <div className="text-xs text-gray-600">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">98%</div>
            <div className="text-xs text-gray-600">Success</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {lawyer.responseTime || Math.floor(Math.random() * 30) + 5}m
            </div>
            <div className="text-xs text-gray-600">Response</div>
          </div>
        </div>

        {/* Bio Preview */}
        <div className="mb-6">
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {lawyer.bio}
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewProfile(lawyer)}
            className="flex-1 bg-white text-blue-600 border-2 border-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 font-semibold text-sm"
          >
            View Profile
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSendMessage(lawyer)}
            className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
          >
            <MessageCircle className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBookConsultation(lawyer)}
            className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Hover Effect Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default LawyerCard;