import React, { useState } from 'react';
import { Search, Shield, Users, Award, ArrowRight, Sparkles, Star, CheckCircle } from 'lucide-react';
import SearchBar from '../Search/SearchBar';
import AuthModal from '../Auth/AuthModal';
import { SearchFilters } from '../../types';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onSearch: (filters: SearchFilters) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleBrowseLawyers = () => {
    // Trigger search with empty filters to show all lawyers
    onSearch({});
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" data-search-section>
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-3 mb-8 shadow-lg"
          >
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="text-blue-800 font-medium">India's #1 Legal Platform</span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600">4.9/5 Rating</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Connect with
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block">
              Expert Lawyers
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Find qualified legal professionals for consultation, representation, and expert advice. 
            <span className="font-semibold text-gray-800"> Secure, professional, and accessible</span> legal services at your fingertips.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm text-gray-600"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>10,000+ Verified Lawyers</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>50,000+ Happy Clients</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>99.9% Secure Platform</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBrowseLawyers}
              className="bg-white/80 backdrop-blur-sm text-blue-600 border-2 border-blue-200 px-8 py-4 rounded-2xl hover:bg-white hover:border-blue-300 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Browse Lawyers
            </motion.button>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-2">
              <SearchBar onSearch={onSearch} />
            </div>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Users,
                value: "10,000+",
                label: "Verified Lawyers",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-100"
              },
              {
                icon: Shield,
                value: "99.9%",
                label: "Secure Platform",
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-100"
              },
              {
                icon: Award,
                value: "4.9★",
                label: "Average Rating",
                color: "from-yellow-500 to-yellow-600",
                bgColor: "bg-yellow-100"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className={`${stat.bgColor} p-4 rounded-2xl`}>
                    <stat.icon className={`h-8 w-8 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                </div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="register"
      />
    </div>
  );
};

export default HeroSection;