import React, { useState } from 'react';
import { X, Star, MapPin, Clock, Verified, Calendar, MessageCircle, Phone, Mail, BookOpen, Award, Users } from 'lucide-react';
import { Lawyer } from '../../types';

interface LawyerProfileProps {
  lawyer: Lawyer;
  onClose: () => void;
  onBookConsultation: (lawyer: Lawyer) => void;
  onSendMessage: (lawyer: Lawyer) => void;
}

const LawyerProfile: React.FC<LawyerProfileProps> = ({
  lawyer,
  onClose,
  onBookConsultation,
  onSendMessage
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'availability'>('overview');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex items-start space-x-6">
              <div className="relative">
                <img
                  src={lawyer.avatar}
                  alt={lawyer.name}
                  className="w-24 h-24 rounded-xl object-cover border-4 border-white/20"
                />
                {lawyer.verified && (
                  <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2">
                    <Verified className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold">{lawyer.name}</h1>
                  {lawyer.verified && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-6 text-white/90 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{lawyer.rating}</span>
                    <span>({lawyer.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="h-5 w-5" />
                    <span>{lawyer.experience} years experience</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-5 w-5" />
                    <span>{lawyer.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {lawyer.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold">${lawyer.hourlyRate}</div>
                <div className="text-white/90">per hour</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 p-6 bg-gray-50 border-b">
            <button
              onClick={() => onBookConsultation(lawyer)}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Book Consultation</span>
            </button>
            
            <button
              onClick={() => onSendMessage(lawyer)}
              className="flex-1 bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Send Message</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'availability', label: 'Availability' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* About */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                  <p className="text-gray-600 leading-relaxed">{lawyer.bio}</p>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Education</span>
                  </h3>
                  <div className="space-y-2">
                    {lawyer.education.map((edu, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bar Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Bar Information</span>
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Bar Number:</span>
                      <span className="font-medium text-gray-900">{lawyer.barNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{lawyer.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{lawyer.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{lawyer.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Client Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold">{lawyer.rating}</span>
                    <span className="text-gray-600">({lawyer.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      client: 'John D.',
                      rating: 5,
                      date: '2 weeks ago',
                      comment: 'Excellent legal representation. Very thorough and professional throughout the entire process.'
                    },
                    {
                      id: 2,
                      client: 'Sarah M.',
                      rating: 4,
                      date: '1 month ago',
                      comment: 'Knowledgeable attorney who helped me navigate a complex legal situation with ease.'
                    },
                    {
                      id: 3,
                      client: 'Mike R.',
                      rating: 5,
                      date: '2 months ago',
                      comment: 'Highly recommend! Great communication and achieved the outcome we were hoping for.'
                    }
                  ].map((review) => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{review.client}</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Availability</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lawyer.availability.map((slot) => (
                    <div key={slot.day} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{slot.day}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          slot.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {slot.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      {slot.available && (
                        <div className="mt-2 text-sm text-gray-600">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Consultation Types</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-blue-800">Video Consultation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-blue-800">In-Person Meeting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-blue-800">Phone Consultation</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;