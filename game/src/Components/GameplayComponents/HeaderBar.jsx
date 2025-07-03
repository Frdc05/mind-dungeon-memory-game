import React from 'react';

export default function HeaderBar({ score, timeLeft, onPause }) {
    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    // Hitung persentase (maksimum skor 15 misalnya)
    const maxScore = 15;
    const progressPercentage = Math.min((score / maxScore) * 100, 100);

    // Hitung panjang bar bertingkat secara proporsional
    const segment1 = Math.min(progressPercentage, 33.33);
    const segment2 = Math.min(Math.max(progressPercentage - 33.33, 0), 33.33);
    const segment3 = Math.min(Math.max(progressPercentage - 66.66, 0), 33.33);

    return (
        <div className="flex items-center justify-between px-4 mb-4 gap-6">
            {/* Tombol Menu (3 Bar) */}
            <button
                onClick={onPause}
                className="flex flex-col justify-center items-center w-8 h-8 gap-[3px] cursor-pointer"
                aria-label="Pause Menu"
            >
                <span className="w-6 h-[3px] bg-black rounded"></span>
                <span className="w-6 h-[3px] bg-black rounded"></span>
                <span className="w-6 h-[3px] bg-black rounded"></span>
            </button>

            {/* Timer */}
            <div className="text-sm font-bold text-blue-800 whitespace-nowrap">
                ⏱ {formatTime(timeLeft)}
            </div>

            {/* Score */}
            <div className="text-lg font-bold text-purple-700 whitespace-nowrap">
                Score: {score}
            </div>

            {/* Multi-segment Progress Bar */}
            <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden flex">
                <div
                    className="bg-indigo-600 h-2.5 transition-all duration-300"
                    style={{ width: `${segment1}%` }}
                ></div>
                <div
                    className="bg-orange-500 h-2.5 transition-all duration-300"
                    style={{ width: `${segment2}%` }}
                ></div>
                <div
                    className="bg-green-600 h-2.5 transition-all duration-300"
                    style={{ width: `${segment3}%` }}
                ></div>
            </div>
        </div>
    );
}
