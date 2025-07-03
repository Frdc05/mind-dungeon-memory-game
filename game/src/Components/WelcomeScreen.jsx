import React, { useState } from 'react';
import SinglePlayerMenu from './MenusComponents/SingplayerMode';
import Rules from './MenusComponents/Rules';
import About from './MenusComponents/About';

const WelcomeScreen = ({ onSelectMode }) => {
    const [menu, setMenu] = useState('main');

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-pink-300 flex flex-col items-center justify-center font-jersey text-center px-6">
            <h1 className="text-6xl font-bold text-purple-800 drop-shadow-md mb-6 animate-bounce">
                Mind Dungeon
            </h1>

            {menu === 'main' && (
                <>
                    <p className="text-lg text-gray-700 mb-10">
                        Flip the match, answer the quiz, beat your mind!
                    </p>
                    <div className="w-64 sm:w-81 flex flex-col gap-4">
                        <button onClick={() => setMenu('single')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg rounded-xl border-4 border-white shadow-md">
                            Play the game
                        </button>

                        <button onClick={() => setMenu('rules')} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg rounded-xl border-4 border-white shadow-md">
                            Rules
                        </button>

                        <button onClick={() => setMenu('about')} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg rounded-xl border-4 border-white shadow-md">
                            About
                        </button>
                    </div>
                </>
            )}

            {menu === 'single' && (
                <>
                    <SinglePlayerMenu onBack={() => setMenu('main')} />
                </>
            )}

            {menu === 'rules' && (
                <>
                    <Rules onBack={() => setMenu('main')} />
                </>
            )}

            {menu === 'about' && (
                <>
                    <About onBack={() => setMenu('main')} />
                </>
            )}

        </div>
    );
};

export default WelcomeScreen;
