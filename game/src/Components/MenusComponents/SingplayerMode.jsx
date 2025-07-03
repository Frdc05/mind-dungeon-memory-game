import React, { useState } from 'react';
import CharacterSelect from '../CharacterSelect';
import AngleLeft from '../Icon/AngleLeft';
import Play from '../Icon/Play';

const SinglePlayerMenu = ({ onBack }) => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [selectedTime, setSelectedTime] = useState('unlimited');

    const timeOptions = [
        { label: '3 mins', value: '3' },
        { label: '5 mins', value: '5' },
        { label: '10 mins', value: '10' },
        { label: '15 mins', value: '15' },
        { label: 'Unlimited', value: 'unlimited' },
    ];

    return (
        <div className="w-full flex flex-col items-center justify-center font-pixel text-center bg-gradient-to-br from-yellow-100 to-pink-200 px-6 py-10">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 space-y-6">

                {/* Back Button */}
                <button onClick={onBack} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm">
                    <p className="flex items-center">
                        <AngleLeft className="inline-block w-5 h-5 mr-2" /> back to menu
                    </p>
                </button>

                {/* Heading */}
                <h2 className="text-3xl font-bold text-purple-700">Single Player</h2>
                <p className="text-gray-600 text-sm">Choose your character and preferences to start the game!</p>

                {/* Character and Name Input */}
                <div className="grid md:grid-cols-2 gap-6 items-start">
                    {/* Character Selection */}
                    <div className=''>
                        <p className="text-sm font-semibold text-gray-700 mb-2 text-center">Character:</p>
                        <CharacterSelect onSelect={(char) => setSelectedCharacter(char)} />
                    </div>

                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 text-start">Player Name :</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>
                </div>

                <hr className="my-4 border-gray-300" />

                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Select Category:</label>
                    <select
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        defaultValue="general"
                    >
                        <option value="general">General Knowledge</option>
                        <option value="science">Science</option>
                        <option value="history">History</option>
                        <option value="geography">Geography</option>
                    </select>
                </div>

                {/* Time Selection */}
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Select Time Limit:</label>
                    <div className="flex flex-wrap gap-3">
                        {timeOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setSelectedTime(opt.value)}
                                className={`px-4 py-2 rounded-md border-2 text-sm ${
                                    selectedTime === opt.value
                                        ? 'bg-purple-500 text-white border-purple-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-100'
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Start Game Button */}
                <button
                    onClick={() => alert('Game Started!')}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 shadow-md"
                >
                    <p className='flex items-center justify-center gap-2'>
                        <span className="hidden sm:inline">Start Game</span>
                        <Play className="inline-block w-5 h-5 mr-2" />
                    </p >
                </button>
            </div>
        </div>
    );
};

export default SinglePlayerMenu;
