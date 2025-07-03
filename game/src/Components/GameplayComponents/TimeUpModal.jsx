import React from 'react';

export default function TimeUpModal({ score, totalQuestions, onRestart, onExit }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center space-y-4 font-sans">
                <h2 className="text-2xl font-bold text-red-600">⏰ Time's Up!</h2>
                <p className="text-lg">Your final score is:</p>
                <p className="text-3xl font-bold text-purple-700">{score} point(s)</p>
                <p className="text-md text-gray-700">Questions answered correctly: <strong>{totalQuestions}</strong></p>

                <div className="flex justify-around mt-6">
                    <button
                        onClick={onRestart}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                    >
                        🔁 Restart
                    </button>
                    <button
                        onClick={onExit}
                        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition"
                    >
                        🚪 Exit to Lobby
                    </button>
                </div>
            </div>
        </div>
    );
}
