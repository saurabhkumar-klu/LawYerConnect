import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Phone, MapPin, CreditCard } from 'lucide-react';
import { Lawyer } from '../../types';

interface BookingModalProps {
  lawyer: Lawyer;
  onClose: () => void;
  onConfirm: (bookingData: any) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ lawyer, onClose, onConfirm }) => {
  const [step, setStep] = useState<'datetime' | 'type' | 'payment'>('datetime');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'video' | 'phone' | 'in-person'>('video');
  const [duration, setDuration] = useState(60);
  const [notes, setNotes] = useState('');

  const totalCost = (lawyer.hourlyRate * duration) / 60;

  const handleNext = () => {
    if (step === 'datetime') {
      setStep('type');
    } else if (step === 'type') {
      setStep('payment');
    }
  };

  const handleBack = () => {
    if (step === 'type') {
      setStep('datetime');
    } else if (step === 'payment') {
      setStep('type');
    }
  };

  const handleConfirm = () => {
    const bookingData = {
      lawyerId: lawyer.id,
      date: selectedDate,
      time: selectedTime,
      duration,
      type: consultationType,
      notes,
      totalCost
    };
    onConfirm(bookingData);
  };

  // Generate available dates (next 30 days, excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  };

  // Generate available time slots
  const getAvailableTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Book Consultation</h2>
              <p className="text-gray-600">with {lawyer.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center mb-8">
            {['datetime', 'type', 'payment'].map((stepName, index) => (
              <React.Fragment key={stepName}>
                <div className={`flex items-center ${
                  step === stepName ? 'text-blue-600' : 
                  ['datetime', 'type', 'payment'].indexOf(step) > index ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                    step === stepName ? 'bg-blue-600 text-white' : 
                    ['datetime', 'type', 'payment'].indexOf(step) > index ? 'bg-green-600 text-white' : 'bg-gray-200'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="ml-2 font-medium capitalize">{stepName}</span>
                </div>
                {index < 2 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    ['datetime', 'type', 'payment'].indexOf(step) > index ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          {step === 'datetime' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Date
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {getAvailableDates().slice(0, 9).map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        selectedDate === date
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Time
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {getAvailableTimeSlots().map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg border text-center transition-colors ${
                        selectedTime === time
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>
            </div>
          )}

          {step === 'type' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Consultation Type
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'video', icon: Video, label: 'Video Call', description: 'Meet online via secure video conference' },
                    { value: 'phone', icon: Phone, label: 'Phone Call', description: 'Traditional phone consultation' },
                    { value: 'in-person', icon: MapPin, label: 'In-Person', description: 'Meet at the lawyer\'s office' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setConsultationType(option.value as any)}
                      className={`w-full p-4 rounded-lg border text-left transition-colors ${
                        consultationType === option.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <option.icon className="h-5 w-5 text-gray-600" />
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your legal matter or any specific questions you have..."
                />
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{new Date(selectedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="capitalize">{consultationType.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>${totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Payment Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8">
            {step !== 'datetime' && (
              <button
                onClick={handleBack}
                className="flex-1 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Back
              </button>
            )}
            
            <button
              onClick={step === 'payment' ? handleConfirm : handleNext}
              disabled={
                (step === 'datetime' && (!selectedDate || !selectedTime)) ||
                (step === 'type' && !consultationType)
              }
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 'payment' ? 'Confirm Booking' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;