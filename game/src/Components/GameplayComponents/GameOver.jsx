import React, { useEffect, useState } from 'react';
import Restart from '../Icon/Restart';
import Cross from '../Icon/Cross';
import Clock from '../Icon/Clock';

export default function TimeUpModal({ score, stage, onRestart, onExit }) {
    const [displayedScore, setDisplayedScore] = useState(0);

    useEffect(() => {
        let current = 0;
        const duration = 1000; // total durasi animasi dalam ms
        const steps = 40;
        const increment = Math.ceil(score / steps);
        const intervalTime = duration / steps;

        const interval = setInterval(() => {
            current += increment;
            if (current >= score) {
                current = score;
                clearInterval(interval);
            }
            setDisplayedScore(current);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [score]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 font-jersey">
            <div className="p-8 shadow-lg w-80 rounded-xl space-y-6 text-center">
                <div className="flex items-center justify-center gap-2">
                    <h2 className="text-6xl font-bold text-red-500">Time's Up!</h2>
                </div>

                <div className="space-y-2">
                    <p className="text-xl text-yellow-200">Your final score is:</p>
                    <p className="text-4xl font-bold text-purple-300 animate-pulse">
                        {displayedScore} point(s)
                    </p>
                    <p className="text-md text-yellow-100">
                        Stage : <span className="font-bold">{stage}</span>
                    </p>
                </div>

                <div className="flex justify-center gap-6 mt-2">
                    <button
                        onClick={onRestart}
                        className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 p-4 rounded-full shadow-inner transform hover:scale-110 active:translate-y-[2px] transition-all duration-150"
                        title="Restart Game"
                    >
                        <Restart w={24} h={24} className="text-yellow-900" />
                    </button>

                    <button
                        onClick={onExit}
                        className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 p-4 rounded-full shadow-inner transform hover:scale-110 active:translate-y-[2px] transition-all duration-150"
                        title="Exit to Lobby"
                    >
                        <Cross w={24} h={24} className="text-yellow-900" />
                    </button>
                </div>
            </div>
        </div>
    );
}
