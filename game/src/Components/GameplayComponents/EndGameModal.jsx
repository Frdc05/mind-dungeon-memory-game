import React from 'react';

export default function GameEndModal({ score, timeInSeconds}) {
    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center space-y-4">
                <h2 className="text-2xl font-bold"> 🎉</h2>
                <p>Final Score: <span className="font-bold text-purple-600">{score}</span></p>
                <p>Total Time: <span className="font-bold text-blue-600">{formatTime(timeInSeconds)}</span></p>
                
                {/* Button Play Again */}
                <button
                    onClick={onRestart}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Play Again
                </button>

                {/* Button Back to Menu  */}
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Back to Menu
                </button>
            </div>
        </div>
    );
}
