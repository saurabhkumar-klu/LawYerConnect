import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Filter, X, Mic, MicOff, Sparkles, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchFilters } from '../../types';
import { specialties, locations } from '../../data/mockData';
import { useVoiceSearch } from '../../hooks/useVoiceSearch';
import toast from 'react-hot-toast';

interface AISearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
}

const AISearchBar: React.FC<AISearchBarProps> = ({ onSearch, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isAIMode, setIsAIMode] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isListening, transcript, startListening, stopListening, isSupported } = useVoiceSearch();

  useEffect(() => {
    if (transcript) {
      setSearchTerm(transcript);
      handleAISearch(transcript);
    }
  }, [transcript]);

  const handleAISearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsAIMode(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // AI-powered query interpretation
    const aiFilters = interpretQuery(query);
    const suggestions = generateSuggestions(query);
    
    setAiSuggestions(suggestions);
    onSearch(aiFilters);
    setIsAIMode(false);
    
    toast.success('AI search completed!', {
      icon: '🤖',
      duration: 2000,
    });
  };

  const interpretQuery = (query: string): SearchFilters => {
    const lowerQuery = query.toLowerCase();
    const filters: SearchFilters = {};

    // Extract specialty
    const foundSpecialty = specialties.find(s => 
      lowerQuery.includes(s.toLowerCase()) || 
      lowerQuery.includes(s.toLowerCase().replace(' law', ''))
    );
    if (foundSpecialty) {
      filters.specialty = foundSpecialty;
    }

    // Extract location
    const foundLocation = locations.find(l => 
      lowerQuery.includes(l.toLowerCase().split(',')[0])
    );
    if (foundLocation) {
      filters.location = foundLocation;
    }

    // Extract price preferences
    if (lowerQuery.includes('cheap') || lowerQuery.includes('affordable') || lowerQuery.includes('budget')) {
      filters.priceRange = [0, 300];
    } else if (lowerQuery.includes('expensive') || lowerQuery.includes('premium') || lowerQuery.includes('top')) {
      filters.priceRange = [500, 1000];
    }

    // Extract rating preferences
    if (lowerQuery.includes('best') || lowerQuery.includes('top rated') || lowerQuery.includes('excellent')) {
      filters.rating = 4.5;
    } else if (lowerQuery.includes('good') || lowerQuery.includes('recommended')) {
      filters.rating = 4.0;
    }

    // Extract experience preferences
    if (lowerQuery.includes('experienced') || lowerQuery.includes('senior')) {
      filters.experience = 10;
    } else if (lowerQuery.includes('junior') || lowerQuery.includes('new')) {
      filters.experience = 2;
    }

    return filters;
  };

  const generateSuggestions = (query: string): string[] => {
    const suggestions = [
      'Try searching for specific legal areas like "divorce lawyer in Mumbai"',
      'Include your budget: "affordable family lawyer"',
      'Specify experience level: "experienced corporate lawyer"',
      'Add location: "criminal lawyer near me"',
      'Use ratings: "top rated property lawyer"'
    ];
    
    return suggestions.slice(0, 3);
  };

  const handleSearch = () => {
    const searchFilters: SearchFilters = {
      ...filters,
      ...(searchTerm && { specialty: searchTerm }),
      ...(location && { location })
    };
    onSearch(searchFilters);
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      stopListening();
    } else {
      if (isSupported) {
        startListening();
        toast('Listening... Speak your search query', {
          icon: '🎤',
          duration: 3000,
        });
      } else {
        toast.error('Voice search not supported in this browser');
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocation('');
    setFilters({});
    setAiSuggestions([]);
    onSearch({});
  };

  const smartSuggestions = [
    'Best divorce lawyer in Mumbai',
    'Affordable criminal defense attorney',
    'Corporate lawyer for startup',
    'Property dispute lawyer near me',
    'Tax consultant with 10+ years experience'
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* AI Search Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Ask AI: 'Find me a good family lawyer in Delhi under ₹300/hour'"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyPress={(e) => e.key === 'Enter' && handleAISearch(searchTerm)}
              className="w-full pl-12 pr-20 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg bg-white dark:bg-gray-700 dark:text-white"
            />
            
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              {isAIMode ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="h-6 w-6 text-blue-600" />
                </motion.div>
              ) : (
                <Search className="h-6 w-6 text-gray-400" />
              )}
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              {isSupported && (
                <button
                  onClick={handleVoiceSearch}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-100 text-red-600 animate-pulse' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              )}
              
              <button
                onClick={() => handleAISearch(searchTerm)}
                disabled={isAIMode || !searchTerm.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Smart Suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10"
              >
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Smart Suggestions
                  </h4>
                  <div className="space-y-2">
                    {smartSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchTerm(suggestion);
                          setShowSuggestions(false);
                          handleAISearch(suggestion);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Location Input */}
        <div className="flex-1 lg:max-w-xs">
          <div className="relative">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-lg bg-white dark:bg-gray-700 dark:text-white"
            />
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {/* AI Suggestions */}
      <AnimatePresence>
        {aiSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                AI Suggestions
              </span>
            </div>
            <div className="space-y-1">
              {aiSuggestions.map((suggestion, index) => (
                <p key={index} className="text-sm text-blue-700 dark:text-blue-400">
                  • {suggestion}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-500 flex items-center space-x-1"
              >
                <X className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Specialty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specialty
                </label>
                <select
                  value={filters.specialty || ''}
                  onChange={(e) => setFilters({ ...filters, specialty: e.target.value || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white"
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating || ''}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hourly Rate (₹)
                </label>
                <select
                  value={filters.priceRange ? `${filters.priceRange[0]}-${filters.priceRange[1]}` : ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      const [min, max] = e.target.value.split('-').map(Number);
                      setFilters({ ...filters, priceRange: [min, max] });
                    } else {
                      setFilters({ ...filters, priceRange: undefined });
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Any Price</option>
                  <option value="0-250">₹0 - ₹250/hr</option>
                  <option value="250-350">₹250 - ₹350/hr</option>
                  <option value="350-500">₹350 - ₹500/hr</option>
                  <option value="500-1000">₹500+/hr</option>
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Experience
                </label>
                <select
                  value={filters.experience || ''}
                  onChange={(e) => setFilters({ ...filters, experience: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Any Experience</option>
                  <option value="2">2+ Years</option>
                  <option value="5">5+ Years</option>
                  <option value="10">10+ Years</option>
                  <option value="15">15+ Years</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearchBar;