import React from 'react';
import Clock from '../Icon/Clock';

export default function HeaderBar({ score, timeLeft, onPause, stage }) {
    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    const maxScore = 15;
    const progressPercentage = Math.min((score / maxScore) * 100, 100);

    const segment1 = Math.min(progressPercentage, 33.33);
    const segment2 = Math.min(Math.max(progressPercentage - 33.33, 0), 33.33);
    const segment3 = Math.min(Math.max(progressPercentage - 66.66, 0), 33.33);

    return (
        <div className="w-full flex max-w gap-6 mx-auto px-4 mb-4">
            {/* Baris Atas: Tombol - Stage - Score - Timer */}
            <button
                onClick={onPause}
                className="flex flex-col border items-center justify-center self-center p-2 gap-[3px] cursor-pointer bg-white hover:bg-gray-100 transition-colors duration-200 shadow-md"
                aria-label="Pause Menu"
            >
                <span className="w-6 h-[3px] bg-black"></span>
                <span className="w-6 h-[3px] bg-black"></span>
                <span className="w-6 h-[3px] bg-black"></span>
            </button>

            <div className="w-full self-center flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    {/* Pause Button */}

                    {/* Stage */}
                    <div className="text-lg font-bold text-purple-700 whitespace-nowrap">
                        Stage {stage}
                    </div>

                    {/* Score */}
                    <div className="text-lg font-bold text-purple-700 whitespace-nowrap">
                        Score: {score}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2.5 bg-gray-200 overflow-hidden flex w-full">
                    <div
                        className="bg-indigo-600 transition-all duration-300"
                        style={{ width: `${segment1}%` }}
                    ></div>
                    <div
                        className="bg-orange-500 transition-all duration-300"
                        style={{ width: `${segment2}%` }}
                    ></div>
                    <div
                        className="bg-green-600 transition-all duration-300"
                        style={{ width: `${segment3}%` }}
                    ></div>
                </div>
            </div>

            {/* Timer */}
            <div className="self-center text-xl font-bold text-blue-800 whitespace-nowrap border-l pl-4">
                <div className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-blue-600" />
                    {formatTime(timeLeft)}
                </div>
            </div>
        </div>
    );
}
