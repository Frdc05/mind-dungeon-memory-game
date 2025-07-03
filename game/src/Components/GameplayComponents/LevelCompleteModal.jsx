// src/components/LevelCompletePopup.jsx
import React, { useEffect } from 'react';

export default function LevelCompletePopup({ isOpen, level, onAutoClose }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onAutoClose();
      }, 2000); // Auto-close in 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen, onAutoClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 font-jersey">
      <div className="bg-white rounded-xl p-6 shadow-xl text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Level {level} Complete!</h2>
        <p className="text-gray-700">Get ready for the next stage...</p>
      </div>
    </div>
  );
}
