import React, { useState } from 'react';
import { Scale, Menu, X, Bell, MessageCircle, User, LogOut, Home, Search, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AuthModal from '../Auth/AuthModal';

interface HeaderProps {
  onMenuClick?: () => void;
  onFindLawyers?: () => void;
  onShowHowItWorks?: () => void;
  onShowResources?: () => void;
  onShowSupport?: () => void;
  onGoHome?: () => void;
  onGoToDashboard?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  onFindLawyers,
  onShowHowItWorks,
  onShowResources,
  onShowSupport,
  onGoHome,
  onGoToDashboard
}) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    if (onGoHome) onGoHome();
  };

  const handleSignIn = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleGetStarted = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const handleFindLawyers = () => {
    if (onFindLawyers) {
      onFindLawyers();
    } else {
      // Default behavior - scroll to search or trigger search
      const searchSection = document.querySelector('[data-search-section]');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setShowMobileMenu(false);
  };

  const handleHowItWorks = () => {
    if (onShowHowItWorks) {
      onShowHowItWorks();
    } else {
      // Default behavior - scroll to features section
      const featuresSection = document.querySelector('[data-features-section]');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setShowMobileMenu(false);
  };

  const handleResources = () => {
    if (onShowResources) {
      onShowResources();
    } else {
      // Show resources modal or navigate to resources page
      alert('Resources section coming soon! This will include legal guides, FAQs, and helpful articles.');
    }
    setShowMobileMenu(false);
  };

  const handleSupport = () => {
    if (onShowSupport) {
      onShowSupport();
    } else {
      // Show support modal or navigate to support page
      alert('Support: For help, please email support@lawyerconnect.in or call +91 98765 43210');
    }
    setShowMobileMenu(false);
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    }
    setShowMobileMenu(false);
  };

  const handleGoToDashboard = () => {
    if (onGoToDashboard) {
      onGoToDashboard();
    }
    setShowUserMenu(false);
    setShowMobileMenu(false);
  };

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <button 
                onClick={handleGoHome}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">LawyerConnect</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Professional Legal Services</p>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={handleGoHome}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                Home
              </button>
              <button 
                onClick={handleFindLawyers}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                Find Lawyers
              </button>
              <button 
                onClick={handleHowItWorks}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                How It Works
              </button>
              <button 
                onClick={handleResources}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                Resources
              </button>
              <button 
                onClick={handleSupport}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                Support
              </button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* Notifications - Only for logged in users */}
                  <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>

                  {/* Messages - Only for logged in users */}
                  <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                      2
                    </span>
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={user.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop`}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="hidden sm:block text-sm font-medium text-gray-700">
                        {user.name}
                      </span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <p className="text-xs text-blue-600 capitalize font-medium">{user.role}</p>
                        </div>
                        
                        {/* Dashboard Link - Show for all user types */}
                        {onGoToDashboard && (
                          <button 
                            onClick={handleGoToDashboard}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          >
                            <User className="h-4 w-4" />
                            <span>Dashboard</span>
                          </button>
                        )}
                        
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Profile Settings</span>
                        </button>
                        
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>Preferences</span>
                        </button>
                        
                        <div className="border-t border-gray-200 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Show Sign In / Get Started only when NOT logged in */
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleSignIn}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={handleGetStarted}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={handleGoHome}
                  className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
                >
                  Home
                </button>
                <button 
                  onClick={handleFindLawyers}
                  className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
                >
                  Find Lawyers
                </button>
                <button 
                  onClick={handleHowItWorks}
                  className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
                >
                  How It Works
                </button>
                <button 
                  onClick={handleResources}
                  className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
                >
                  Resources
                </button>
                <button 
                  onClick={handleSupport}
                  className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
                >
                  Support
                </button>
                
                {/* Mobile Dashboard Link for logged in users */}
                {user && onGoToDashboard && (
                  <button 
                    onClick={handleGoToDashboard}
                    className="text-left text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
                  >
                    Dashboard
                  </button>
                )}
                
                {/* Mobile Auth buttons for non-logged in users */}
                {!user && (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <button 
                      onClick={handleSignIn}
                      className="w-full text-left text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={handleGetStarted}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm text-center"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal - Only show when not logged in */}
      {!user && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={authMode}
        />
      )}
    </>
  );
};

export default Header;