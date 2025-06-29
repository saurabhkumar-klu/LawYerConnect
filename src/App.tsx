import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import { useNotifications } from './hooks/useNotifications';
import AuthProvider from './components/Common/AuthProvider';
import ThemeProvider from './components/Common/ThemeProvider';
import ErrorBoundary from './components/Common/ErrorBoundary';
import LoadingSpinner from './components/Common/LoadingSpinner';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HeroSection from './components/Hero/HeroSection';
import FeaturesSection from './components/Features/FeaturesSection';
import TestimonialsSection from './components/Testimonials/TestimonialsSection';
import AISearchBar from './components/Search/AISearchBar';
import LawyerCard from './components/Lawyer/LawyerCard';
import LawyerProfile from './components/Lawyer/LawyerProfile';
import BookingModal from './components/Consultation/BookingModal';
import ClientDashboard from './components/Dashboard/ClientDashboard';
import LawyerDashboard from './components/Dashboard/LawyerDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ChatInterface from './components/Chat/ChatInterface';
import VideoCall from './components/Video/VideoCall';
import { SearchFilters, Lawyer, User } from './types';
import { mockLawyers } from './data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { requestPermission } = useNotifications();
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatRecipient, setChatRecipient] = useState<User | null>(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'search'>('home');

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      try {
        // Request notification permission safely
        try {
          await requestPermission();
        } catch (error) {
          console.log('Notification permission request failed:', error);
        }
        
        // Skip service worker registration in development/StackBlitz environment
        const isDevelopment = window.location.hostname.includes('stackblitz') || 
                             window.location.hostname.includes('webcontainer') ||
                             window.location.hostname.includes('localhost') ||
                             window.location.port !== '';
        
        if ('serviceWorker' in navigator && !isDevelopment) {
          try {
            await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered');
          } catch (error) {
            console.log('Service Worker registration skipped in development');
          }
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('App initialization error:', error);
        setIsInitialized(true); // Still set to true to allow app to load
      }
    };

    initializeApp();
  }, [requestPermission]);

  // Header navigation handlers
  const handleFindLawyers = () => {
    if (showSearchResults) {
      // If already showing results, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Show all lawyers
      handleSearch({});
    }
    setCurrentView('search');
  };

  const handleShowHowItWorks = () => {
    setShowSearchResults(false);
    setCurrentView('home');
    setTimeout(() => {
      const featuresSection = document.querySelector('[data-features-section]');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleShowResources = () => {
    alert('Resources section coming soon! This will include:\n\n• Legal guides and articles\n• Frequently asked questions\n• Legal document templates\n• Know your rights information\n• Legal process explanations');
  };

  const handleShowSupport = () => {
    alert('Support & Contact Information:\n\n📧 Email: support@lawyerconnect.in\n📞 Phone: +91 98765 43210\n🕒 Hours: Mon-Fri 9AM-6PM IST\n💬 Live Chat: Available 24/7\n\nFor urgent legal matters, please call our helpline.');
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setShowSearchResults(false);
  };

  const handleGoToDashboard = () => {
    setCurrentView('dashboard');
    setShowSearchResults(false);
  };

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    
    let results = mockLawyers;
    
    // Apply AI-enhanced filters
    if (filters.specialty) {
      results = results.filter(lawyer => 
        lawyer.specialties.some(s => 
          s.toLowerCase().includes(filters.specialty!.toLowerCase())
        )
      );
    }
    
    if (filters.location) {
      results = results.filter(lawyer => 
        lawyer.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.rating) {
      results = results.filter(lawyer => lawyer.rating >= filters.rating!);
    }
    
    if (filters.priceRange) {
      results = results.filter(lawyer => 
        lawyer.hourlyRate >= filters.priceRange![0] && 
        lawyer.hourlyRate <= filters.priceRange![1]
      );
    }

    if (filters.experience) {
      results = results.filter(lawyer => lawyer.experience >= filters.experience!);
    }

    if (filters.verified) {
      results = results.filter(lawyer => lawyer.verified);
    }

    // Apply sorting
    if (filters.sortBy) {
      results.sort((a, b) => {
        const order = filters.sortOrder === 'desc' ? -1 : 1;
        switch (filters.sortBy) {
          case 'rating':
            return (a.rating - b.rating) * order;
          case 'price':
            return (a.hourlyRate - b.hourlyRate) * order;
          case 'experience':
            return (a.experience - b.experience) * order;
          case 'reviews':
            return (a.reviewCount - b.reviewCount) * order;
          default:
            return 0;
        }
      });
    }
    
    setFilteredLawyers(results);
    setShowSearchResults(true);
    setCurrentView('search');
  };

  const handleViewProfile = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setShowProfile(true);
  };

  const handleBookConsultation = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setShowBookingModal(true);
  };

  const handleSendMessage = (lawyer: Lawyer) => {
    setChatRecipient(lawyer);
    setShowChat(true);
  };

  const handleBookingConfirm = (bookingData: any) => {
    console.log('Booking confirmed:', bookingData);
    setShowBookingModal(false);
    setSelectedLawyer(null);
    
    // Show success message and potentially start video call
    if (bookingData.type === 'video') {
      setTimeout(() => {
        setShowVideoCall(true);
      }, 2000);
    }
  };

  const handleStartVideoCall = () => {
    setShowVideoCall(true);
  };

  const handleEndVideoCall = () => {
    setShowVideoCall(false);
  };

  if (isLoading || !isInitialized) {
    return <LoadingSpinner fullScreen text="Initializing LawyerConnect..." />;
  }

  const renderContent = () => {
    // If user is logged in and current view is dashboard, show appropriate dashboard
    if (user && currentView === 'dashboard') {
      switch (user.role) {
        case 'client':
          return <ClientDashboard />;
        case 'lawyer':
          return <LawyerDashboard />;
        case 'admin':
          return <AdminDashboard />;
        default:
          return <ClientDashboard />;
      }
    }

    // If showing search results or current view is search
    if (showSearchResults || currentView === 'search') {
      return (
        <motion.div
          key="results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {/* Search Results Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  AI Search Results
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Found {filteredLawyers.length} lawyers matching your criteria
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleGoHome}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  ← Back to Home
                </button>
                {user && (
                  <button
                    onClick={handleGoToDashboard}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Dashboard
                  </button>
                )}
              </div>
            </div>
            
            {/* Enhanced Search Bar */}
            <AISearchBar onSearch={handleSearch} />
          </div>

          {/* Results */}
          {filteredLawyers.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredLawyers.map((lawyer, index) => (
                <motion.div
                  key={lawyer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LawyerCard
                    lawyer={lawyer}
                    onViewProfile={handleViewProfile}
                    onBookConsultation={handleBookConsultation}
                    onSendMessage={handleSendMessage}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No lawyers found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search criteria or browse all lawyers
              </p>
            </motion.div>
          )}
        </motion.div>
      );
    }

    // Default home view
    return (
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <HeroSection onSearch={handleSearch} />
        <FeaturesSection />
        <TestimonialsSection />
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header 
        onFindLawyers={handleFindLawyers}
        onShowHowItWorks={handleShowHowItWorks}
        onShowResources={handleShowResources}
        onShowSupport={handleShowSupport}
        onGoHome={handleGoHome}
        onGoToDashboard={user ? handleGoToDashboard : undefined}
      />
      
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>

      <Footer />

      {/* Modals */}
      <AnimatePresence>
        {showProfile && selectedLawyer && (
          <LawyerProfile
            lawyer={selectedLawyer}
            onClose={() => {
              setShowProfile(false);
              setSelectedLawyer(null);
            }}
            onBookConsultation={handleBookConsultation}
            onSendMessage={handleSendMessage}
          />
        )}

        {showBookingModal && selectedLawyer && (
          <BookingModal
            lawyer={selectedLawyer}
            onClose={() => {
              setShowBookingModal(false);
              setSelectedLawyer(null);
            }}
            onConfirm={handleBookingConfirm}
          />
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      {showChat && chatRecipient && user && (
        <ChatInterface
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          recipient={chatRecipient}
          currentUser={user}
        />
      )}

      {/* Video Call */}
      <VideoCall
        isActive={showVideoCall}
        onEnd={handleEndVideoCall}
        participantName={selectedLawyer?.name || 'Lawyer'}
        participantAvatar={selectedLawyer?.avatar || ''}
      />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;