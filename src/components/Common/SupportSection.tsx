import React from 'react';

const SupportSection: React.FC = () => (
  <section id="support-section" className="bg-blue-50 dark:bg-blue-900 py-8 px-4 sm:px-8 border-t border-blue-100 dark:border-blue-800">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-2">Need Help or Support?</h2>
      <p className="text-blue-700 dark:text-blue-300 mb-4">
        Our team is here to assist you. Reach out to us anytime!
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-4">
        <div>
          <span className="font-semibold">Email:</span> <a href="mailto:support@lawyerconnect.in" className="text-blue-600 hover:underline">support@lawyerconnect.in</a>
        </div>
        <div>
          <span className="font-semibold">Phone:</span> <a href="tel:+919876543210" className="text-blue-600 hover:underline">+91 98765 43210</a>
        </div>
        <div>
          <span className="font-semibold">Hours:</span> Mon-Fri 9AM-6PM IST
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#faq" className="text-blue-700 hover:underline">Read our FAQ</a>
        <a href="mailto:support@lawyerconnect.in" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors">Contact Support</a>
      </div>
    </div>
  </section>
);

export default SupportSection; 