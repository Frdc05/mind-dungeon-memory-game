import React from 'react';
import AngleLeft from "../Icon/AngleLeft";

export default function Rules({ onBack }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center font-jersey relative">
            <div className="relative z-10 w-full max-w-3xl px-6 py-8 flex flex-col items-center text-center">

                {/* Title */}
                <h1 className="text-5xl font-bold text-yellow-900 drop-shadow-[0_3px_2px_rgba(0,0,0,0.5)] mb-10">
                    Game Rules
                </h1>

                {/* Rule Box */}
                <div className="text-yellow-800 text-lg font-medium space-y-4 bg-yellow-50/50 px-6 py-6 rounded-lg border border-yellow-200 shadow-inner text-left w-full">
                    <p><strong>1. Choose Your Hero:</strong> Enter your name and select a character to begin your journey.</p>
                    <p><strong>2. Match the Cards:</strong> Flip and match identical card pairs to damage the enemy.</p>
                    <p><strong>3. Time & Health:</strong> Player health decreases over time. Finish the level before time runs out!</p>
                    <p><strong>4. Enemy Health:</strong> Enemy loses health as you match more cards. Defeat them to progress.</p>
                    <p><strong>5. Scoring System:</strong></p>
                    <ul className="list-disc pl-6">
                        <li>+500 points per match</li>
                        <li>Bonus points for quick consecutive matches (streaks)</li>
                        <li>Extra score from bonus points on cards</li>
                    </ul>
                    <p><strong>6. Win the Game:</strong> Finish all levels to become a true hero!</p>
                    <p><strong>7. Game Over:</strong> You lose if time runs out before clearing all card pairs.</p>
                </div>

                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="mt-10 flex items-center gap-2 bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg shadow-md active:translate-y-[2px] transition-all duration-150"
                >
                    <AngleLeft w={20} h={20} />
                    Back to Menu
                </button>
            </div>
        </div>
    );
}
