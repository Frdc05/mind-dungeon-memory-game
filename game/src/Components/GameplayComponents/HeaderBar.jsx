import React, { useEffect, useState, useRef } from 'react';
import Clock from '../Icon/Clock';
import Bar from '../Icon/Bar';

export default function HeaderBar({ progress, timeLeft, onPause, stage, score }) {
    const [displayedScore, setDisplayedScore] = useState(score);
    const [scoreDiff, setScoreDiff] = useState(0);
    const [showScorePopup, setShowScorePopup] = useState(false);
    const [scoreFlash, setScoreFlash] = useState(false);
    const previousScore = useRef(score);

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    const percentage = Math.min(progress * 100, 100).toFixed(0);

    useEffect(() => {
        const diff = score - previousScore.current;
        if (diff <= 0) return;

        setScoreDiff(diff);
        setShowScorePopup(true);
        setScoreFlash(true);
        previousScore.current = score;

        const steps = 20;
        let current = displayedScore;
        const increment = Math.ceil(diff / steps);
        const interval = setInterval(() => {
            current += increment;
            if (current >= score) {
                current = score;
                clearInterval(interval);
            }
            setDisplayedScore(current);
        }, 30);

        const popupTimeout = setTimeout(() => setShowScorePopup(false), 1300);
        const flashTimeout = setTimeout(() => setScoreFlash(false), 800);

        return () => {
            clearInterval(interval);
            clearTimeout(popupTimeout);
            clearTimeout(flashTimeout);
        };
    }, [score]);

    const getBarColor = () => {
        if (percentage <= 40) {
            return 'linear-gradient(to right, #ef4444, #dc2626)';
        } else if (percentage <= 60) {
            return 'linear-gradient(to right, #facc15, #fbbf24)';
        } else {
            return 'linear-gradient(to right, #34d399, #10b981)';
        }
    };

    return (
        <div className="w-full flex items-center justify-between px-6 py-4 font-jersey text-white z-50 relative">
            {/* Pause Button */}
            <button
                onClick={onPause}
                className="bg-yellow-900 hover:bg-yellow-800 text-yellow-900 font-bold px-4 py-2 rounded-lg shadow-inner active:translate-y-[2px] transition-all duration-150"
                aria-label="Pause Menu"
            >
                <div className="flex items-center">
                    <Bar className="w-6 h-6 text-yellow-300" />
                </div>
            </button>

            {/* Middle Section */}
            <div className="flex-1 px-6 relative">
                <div className="flex justify-between items-center mb-2">
                    <div className="text-xl sm:text-2xl font-bold text-yellow-400 drop-shadow-md">
                        Stage {stage}
                    </div>
                    <div
                        className={`text-xl sm:text-2xl font-bold drop-shadow-md relative ${
                            scoreFlash ? 'text-yellow-300 shadow-yellow-300 animate-score-flash' : 'text-yellow-400'
                        }`}
                    >
                        Score: {displayedScore} pts

                        {showScorePopup && (
                            <span className="absolute -top-6 right-0 text-lime-300 text-sm font-bold animate-bounce-in-fade">
                                +{scoreDiff} pts
                            </span>
                        )}
                    </div>
                </div>

                <div className="h-6 bg-yellow-100/30 rounded-full overflow-hidden shadow-inner relative">
                    <div
                        className="h-full transition-all duration-500 flex items-center justify-center"
                        style={{
                            width: `${percentage}%`,
                            background: getBarColor(),
                        }}
                    >
                        <span className="text-sm font-bold text-white drop-shadow-sm">
                            {percentage}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 text-4xl font-bold text-blue-100 drop-shadow-md bg-yellow-900 px-4 rounded-lg shadow-lg border-0">
                <Clock className="w-7 h-7 text-yellow-400" />
                <span className="text-yellow-400">{formatTime(timeLeft)}</span>
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes bounceInFade {
                    0% {
                        transform: translateY(10px);
                        opacity: 0;
                        scale: 0.9;
                    }
                    30% {
                        transform: translateY(0);
                        opacity: 1;
                        scale: 1.1;
                    }
                    70% {
                        scale: 1;
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-15px);
                        opacity: 0;
                    }
                }

                .animate-bounce-in-fade {
                    animation: bounceInFade 1.2s ease-out forwards;
                }

                @keyframes scoreFlash {
                    0% {
                        text-shadow: 0 0 0px #facc15;
                    }
                    50% {
                        text-shadow: 0 0 6px #facc15;
                    }
                    100% {
                        text-shadow: 0 0 0px #facc15;
                    }
                }

                .animate-score-flash {
                    animation: scoreFlash 0.8s ease-in-out;
                }
            `}</style>
        </div>
    );
}
