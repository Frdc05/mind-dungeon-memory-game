import React from 'react';

export default function PauseModal({ onResume, onRestart }) {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 space-y-4 text-center">
                <h2 className="text-2xl font-bold text-purple-700">Game Paused</h2>
                
                <button
                    onClick={onResume}
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                    Resume
                </button>
                
                <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500"
                >
                    Restart
                </button>
                
                <button
                    onClick={() => window.location.reload()} 
                    className="w-full bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
                >
                    Quit to Menu
                </button>
            </div>
        </div>
    );
}   
