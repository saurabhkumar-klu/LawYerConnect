import React, { useState } from 'react';
import { Search, MapPin, Filter, X, Sparkles, TrendingUp } from 'lucide-react';
import { SearchFilters } from '../../types';
import { specialties, locations } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = () => {
    const searchFilters: SearchFilters = {
      ...filters,
      ...(searchTerm && { specialty: searchTerm }),
      ...(location && { location })
    };
    onSearch(searchFilters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocation('');
    setFilters({});
    onSearch({});
  };

  const popularSearches = [
    'Family Law',
    'Corporate Law',
    'Criminal Defense',
    'Property Law',
    'Tax Law'
  ];

  const trendingLocations = [
    'Mumbai, Maharashtra',
    'Delhi, Delhi',
    'Bangalore, Karnataka',
    'Chennai, Tamil Nadu'
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by specialty (e.g., Family Law, Corporate Law)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg bg-white shadow-lg hover:shadow-xl"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Sparkles className="h-5 w-5 text-blue-500" />
            </div>
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-20 overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold text-gray-700">Popular Searches</span>
                  </div>
                  <div className="space-y-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchTerm(search);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Location Input */}
        <div className="flex-1 lg:max-w-xs relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg bg-white shadow-lg hover:shadow-xl"
            />
            <MapPin className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-6 py-4 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 bg-white shadow-lg hover:shadow-xl"
          >
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filters</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            Search
          </motion.button>
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-500 flex items-center space-x-1 font-medium"
              >
                <X className="h-4 w-4" />
                <span>Clear All</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Specialty Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Specialty
                </label>
                <select
                  value={filters.specialty || ''}
                  onChange={(e) => setFilters({ ...filters, specialty: e.target.value || undefined })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all duration-300"
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
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating || ''}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all duration-300"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.8">4.8+ Stars</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
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
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all duration-300"
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
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Experience
                </label>
                <select
                  value={filters.experience || ''}
                  onChange={(e) => setFilters({ ...filters, experience: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all duration-300"
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

export default SearchBar;