import React, { useEffect } from 'react';
import Restart from '../Icon/Restart';
import Clock from '../Icon/Clock';
import Check from '../Icon/Check';

export default function LevelCompletePopup({ isOpen, level, onAutoClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onAutoClose(); // Ini akan memicu handleNextLevel dari GameBoard
    }, 2000);
    return () => clearTimeout(timer);
  }, [isOpen, onAutoClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center font-jersey">
      <div className="p-8 shadow-lg w-80 rounded-xl space-y-6 text-center bg-yellow-100/90 border-4 border-green-400 animate-fade-in">
        <div className="flex flex-col items-center justify-center">
          <Check w={48} h={48} className="text-green-500 drop-shadow-md" />
          <h3 className="text-4xl font-bold text-green-600 mt-2">Level {level}</h3>
          <p className="text-md text-yellow-900 font-semibold mt-1">Complete!</p>
        </div>

        <div className="flex justify-center items-center gap-2 text-green-800 text-sm">
          <Clock className="w-5 h-5 text-green-500" />
          <span>Preparing next stage...</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
