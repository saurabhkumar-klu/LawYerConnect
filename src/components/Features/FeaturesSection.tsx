import React from 'react';
import { Video, Shield, Clock, MessageCircle, FileText, Star, Calendar, CreditCard, Zap, Globe, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Video,
      title: 'HD Video Consultations',
      description: 'Crystal clear video calls with lawyers from anywhere in India',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'End-to-end encryption protecting all your legal communications',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'AI-powered lawyer matching in under 60 seconds',
      color: 'purple',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      icon: MessageCircle,
      title: 'Secure Messaging',
      description: 'Encrypted chat with real-time notifications and file sharing',
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FileText,
      title: 'Smart Documents',
      description: 'Digital signatures, templates, and automated legal forms',
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Star,
      title: 'Verified Reviews',
      description: 'Authentic client feedback with detailed rating system',
      color: 'pink',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-optimized booking with automatic reminders',
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      icon: CreditCard,
      title: 'Transparent Pricing',
      description: 'Upfront costs with secure payments and instant invoicing',
      color: 'orange',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Available in 10+ Indian languages for better communication',
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Rigorous lawyer verification and continuous quality monitoring',
      color: 'violet',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: '24/7 customer support with dedicated legal advisors',
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock access to legal help when you need it most',
      color: 'rose',
      gradient: 'from-rose-500 to-pink-500'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      pink: 'bg-pink-100 text-pink-600',
      teal: 'bg-teal-100 text-teal-600',
      orange: 'bg-orange-100 text-orange-600',
      emerald: 'bg-emerald-100 text-emerald-600',
      violet: 'bg-violet-100 text-violet-600',
      cyan: 'bg-cyan-100 text-cyan-600',
      rose: 'bg-rose-100 text-rose-600'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-600';
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" data-features-section>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-6 py-3 mb-6">
            <Star className="h-5 w-5 text-blue-600" />
            <span className="text-blue-800 font-semibold">Why Choose LawyerConnect?</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Everything You Need for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Legal Success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide a comprehensive platform that makes legal consultation accessible, 
            secure, and convenient for everyone across India.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className={`p-4 rounded-2xl ${getColorClasses(feature.color)} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Connect with Expert Lawyers?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Join thousands of clients who have found the legal help they need through our platform. 
                Start your journey to legal success today.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const searchSection = document.querySelector('[data-search-section]');
                  if (searchSection) {
                    searchSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl"
              >
                Start Your Search
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;