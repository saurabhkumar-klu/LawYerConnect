import React from 'react';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <span className="text-2xl">&times;</span>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Preferences</h2>
        <div className="text-gray-600 dark:text-gray-300 text-center py-8">
          <p>Preferences functionality coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal; 