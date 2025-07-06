import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AngleLeft from '../Icon/AngleLeft';
import Play from '../Icon/Play';
import Faces from '../Icon/Faces';
import Sprite from '../Icon/Sprite';
import Toast from '../Functionality/Toast';

const classLabels = [
    'Warrior', 'Priest', 'Brawler', 'Thief',
    'Knight', 'Mage', 'Swordsman', 'Alchemist'
];

export default function GameSetup({ onBack }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [showToast, setShowToast] = useState(false);

    const navigate = useNavigate();

    const handleStartGame = () => {
        if (!playerName.trim()) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
            return;
        }

        // Navigate to game with query parameters
        navigate(`/game?name=${encodeURIComponent(playerName)}&avatar=${selectedIndex}`);
    };

    return (
        <>
        {/* Background */}
        <div
            className="w-full min-h-screen flex items-center justify-center font-pixel bg-cover bg-center"
            style={{ backgroundImage: "url('/Backgrounds/forest-bg.png')" }}
        >
            <div className="w-full max-w-5xl backdrop-blur-sm bg-white/10 border border-yellow-300/30 shadow-[0_0_25px_rgba(255,215,0,0.15)] rounded-2xl px-6 md:px-8 py-8 text-white">

                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full shadow-md active:scale-95 transition-all duration-150"
                    >
                        <AngleLeft w={18} h={18} />
                        Back to Menu
                    </button>
                </div>

                {/* Title */}
                <div className="mb-5 text-start">
                    <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-lg">
                        Game Setup
                    </h2>
                    <p className="text-base mt-1 text-emerald-100 drop-shadow-sm">
                        Choose your hero and begin your <span className="font-bold">journey</span>!
                    </p>
                </div>
            
                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-6 mt-4">
                    {/* Character Preview */}
                    <div className="w-full md:w-1/3 flex justify-center items-center relative">
                        <div className="rounded-xl border-2 border-yellow-400 p-4 bg-yellow-500/10 shadow-inner flex flex-col items-center gap-2">
                            <Sprite charIndex={selectedIndex} scale={3} animate={true} />
                            <div className="text-yellow-500 font-bold text-xl mt-2 drop-shadow-md">
                                {classLabels[selectedIndex]}
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="w-full md:w-2/3 flex flex-col gap-4">
                        {/* Name Input */}
                        <div>
                            <label className="text-yellow-600 font-semibold text-lg text-start mb-1 block drop-shadow-lg">
                                Player Name:
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-3 py-2 rounded-md border-2 border-yellow-500 bg-yellow-300/50 text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-700"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                            />
                        </div>

                        {/* Character Grid */}
                        <div className="grid grid-cols-4 gap-3 p-3 rounded-lg bg-yellow-50/30 backdrop-blur-sm shadow-inner border border-yellow-200/40">
                            {[...Array(8)].map((_, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedIndex(idx)}
                                    className={`cursor-pointer rounded-md p-4 transition
                                    ${selectedIndex === idx
                                        ? 'border-yellow-400 scale-105 bg-yellow-100/40'
                                        : 'border-transparent hover:border-yellow-300/30 hover:bg-yellow-50/10'
                                    }`}
                                >
                                    <Faces x={idx % 4} y={Math.floor(idx / 4)} scale={1} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Start Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={handleStartGame}
                        className="bg-yellow-400 hover:bg-yellow-500 text-amber-900 px-6 py-3 rounded-full shadow-lg text-lg flex items-center gap-2 mx-auto active:scale-95 transition-all duration-150"
                    >
                        <Play className="w-5 h-5" />
                        Start Game
                    </button>
                </div>
            </div>
        </div>

        {/* Toast */}
        {showToast && (
            <Toast
                message="Please enter your name to start!"
                type="warning"
                onClose={() => setShowToast(false)}
            />
        )}
        </>
    );
}
