import React from 'react';
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">LawyerConnect</h2>
                <p className="text-sm text-gray-400">Professional Legal Services</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting clients with qualified legal professionals for expert consultation and representation across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find Lawyers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Book Consultations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Legal Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Document Review</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Case Management</a></li>
            </ul>
          </div>

          {/* Legal Areas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal Areas</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Family Law</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Corporate Law</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Criminal Defense</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Real Estate</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tax Law</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">support@lawyerconnect.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Credit Section */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div className="text-center">
                <p className="text-white font-medium">Developed by</p>
                <p className="text-blue-300 text-lg font-bold">Saurabh Kumar</p>
                <p className="text-gray-300 text-sm">Full Stack Developer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 LawyerConnect. All rights reserved. Made in India 🇮🇳
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;