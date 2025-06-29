import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Small Business Owner',
      avatar: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: 'LawyerConnect made it incredibly easy to find the right attorney for my business needs. The platform is intuitive and the lawyers are highly qualified.',
      specialty: 'Corporate Law'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Property Developer',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: 'The video consultation feature saved me so much time. I was able to get expert legal advice without leaving my office. Highly recommended!',
      specialty: 'Real Estate Law'
    },
    {
      id: 3,
      name: 'Jennifer Williams',
      role: 'Working Mother',
      avatar: 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: 'Going through a divorce was stressful, but LawyerConnect helped me find a compassionate family lawyer who guided me through the process with care.',
      specialty: 'Family Law'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      role: 'Startup Founder',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 5,
      content: 'The transparent pricing and secure payment system gave me confidence. I knew exactly what I was paying for and felt my information was safe.',
      specialty: 'Intellectual Property'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real clients have to say about their experience with LawyerConnect.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Quote className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 text-center mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-blue-600 font-medium">{testimonial.specialty}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
                <div className="text-gray-600">Successful Consultations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">4.9★</div>
                <div className="text-gray-600">Average Client Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;