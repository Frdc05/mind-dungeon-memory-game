import React from 'react';
import { useNavigate } from 'react-router-dom';
import Play from '../Icon/Play';
import Restart from '../Icon/Restart';
import Cross from '../Icon/Cross';

export default function PauseModal({ onResume, onRestart }) {
    const navigate = useNavigate(); 

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center font-jersey">
            <div className="bg-yellow-900/5 backdrop-blur-xs p-8 shadow-lg w-80 rounded-xl space-y-6 text-center">
                <h2 className="text-6xl font-bold text-yellow-500">Game Paused</h2>

                <div className="flex justify-center gap-6">
                    <button
                        onClick={onRestart}
                        className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-bold p-4 text-lg rounded-full shadow-inner active:translate-y-[2px] transition-all duration-150 transform hover:scale-110"
                        title="Restart Game"
                    >
                        <Restart w={24} h={24} className="text-yellow-900" />
                    </button>

                    <button
                        onClick={onResume}
                        className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-bold p-4 text-lg rounded-full shadow-inner active:translate-y-[2px] transition-all duration-150 transform hover:scale-110"
                        title="Resume Game"
                    >
                        <Play w={24} h={24} className="text-yellow-900" />
                    </button>

                    <button
                        onClick={() => navigate('/')} 
                        className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-bold p-4 text-lg rounded-full shadow-inner active:translate-y-[2px] transition-all duration-150 transform hover:scale-110"
                        title="Exit Game"
                    >
                        <Cross w={24} h={24} className="text-yellow-900" />
                    </button>
                </div>
            </div>
        </div>
    );
}
