import React, { useState, useEffect } from 'react';
import HeaderBar from './HeaderBar';
import CardFront from './CardFront';
import CardBack from './CardBack';
import PauseModal from './PauseModal';
import LevelCompletePopup from './LevelCompleteModal';
import GameEndModal from './EndGameModal';
import levelData from './levels/levelData';
import Sprite from '../Icon/Sprite';

export default function GameBoard() {
    const [level, setLevel] = useState(1);
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [showLevelPopup, setShowLevelPopup] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());
    const [elapsedTime, setElapsedTime] = useState(0);
    const [wrongCards, setWrongCards] = useState([]);
    const [playerHealth, setPlayerHealth] = useState(3);
    const [enemyHealth, setEnemyHealth] = useState(3);
    const [showGameOver, setShowGameOver] = useState(false);
    const [attackEffect, setAttackEffect] = useState('');
    const [defenseEffect, setDefenseEffect] = useState('');

    const maxLevel = Object.keys(levelData).length;
    const gridCols = levelData[level]?.grid || 4;
    const bgImage = levelData[level]?.background;

    useEffect(() => {
        const data = levelData[level];
        if (data) {
            const duplicated = [...data.cards, ...data.cards];
            const shuffled = duplicated.sort(() => Math.random() - 0.5).map((card, index) => ({ ...card, uid: index }));
            setCards(shuffled);
            setFlipped([]);
            setMatched([]);
            setShowLevelPopup(false);
        }
    }, [level]);

    useEffect(() => {
        if (flipped.length === 2) {
            const [firstIdx, secondIdx] = flipped;
            if (cards[firstIdx].label === cards[secondIdx].label) {
                setAttackEffect('animate-attack');
                setTimeout(() => {
                    setAttackEffect('');
                    setMatched((prev) => [...prev, firstIdx, secondIdx]);
                    setScore((prev) => prev + 1);
                    setFlipped([]);
                    setEnemyHealth((prev) => prev - 1);
                }, 600);
            } else {
                setDefenseEffect('animate-damage');
                setWrongCards([firstIdx, secondIdx]);
                setTimeout(() => {
                    setFlipped([]);
                    setWrongCards([]);
                    setDefenseEffect('');
                    setPlayerHealth((prev) => {
                        if (prev - 1 <= 0) {
                            setShowGameOver(true);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        }
    }, [flipped, cards]);

    useEffect(() => {
        if (cards.length > 0 && matched.length === cards.length) {
            if (level < maxLevel && levelData[level + 1]) {
                setTimeout(() => setShowLevelPopup(true), 500);
            } else {
                const endTime = Date.now();
                setElapsedTime(Math.floor((endTime - startTime) / 1000));
                setTimeout(() => setIsGameFinished(true), 500);
            }
        }
    }, [matched, cards, level]);

    const handleFlip = (index) => {
        if (isPaused || flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;
        setFlipped([...flipped, index]);
    };

    const handleNextLevel = () => {
        setLevel((prev) => prev + 1);
        setEnemyHealth(3);
    };

    const handleRestart = () => {
        setScore(0);
        setLevel(1);
        setPlayerHealth(3);
        setEnemyHealth(3);
        setIsGameFinished(false);
        setShowGameOver(false);
        setStartTime(Date.now());
    };

    const cardSize = 600 / Math.ceil(cards.length / gridCols);

    return (
        <div
            className="w-full min-h-screen p-4 font-jersey text-center bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <HeaderBar score={score} onPause={() => setIsPaused(true)} timeLeft={0} stage={level} />

            <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
                {/* Player */}
                <div className="flex flex-col items-center">
                    <div className="text-red-600 font-bold text-lg mb-1">❤️ {playerHealth}</div>
                    <Sprite charIndex={1} scale={2} animate={true} className={defenseEffect} />
                </div>

                {/* Game Grid */}
                <div className="w-[800px] h-[600px] border-4 border-gray-800 mt-4 flex items-center justify-center overflow-hidden">
                    <div
                        className="grid gap-2"
                        style={{
                            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                            width: '100%',
                            height: '100%',
                            justifyItems: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {cards.map((card, index) => {
                            const isFlipped = flipped.includes(index) || matched.includes(index);
                            const isMatched = matched.includes(index);
                            const isWrong = wrongCards.includes(index);

                            return (
                                <div
                                    key={card.uid}
                                    className={`aspect-[3/4] flex items-center justify-center perspective transition-opacity duration-500 ease-out cursor-pointer
                                        ${isMatched ? 'animate-fade-out pointer-events-none' : ''} 
                                        ${isWrong ? 'animate-shake' : ''}`}
                                    style={{ width: `${cardSize}px`, maxWidth: '100px' }}
                                    onClick={() => handleFlip(index)}
                                >
                                    <div
                                        className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 ease-in-out 
                                            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                                    >
                                        <CardFront />
                                        <CardBack image={card.image} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Enemy */}
                <div className="flex flex-col items-center">
                    <div className="text-blue-600 font-bold text-lg mb-1">💀 {enemyHealth}</div>
                    <Sprite charIndex={0} scale={2} animate={true} className={attackEffect} />
                </div>
            </div>

            {isPaused && <PauseModal onResume={() => setIsPaused(false)} onRestart={handleRestart} />}
            <LevelCompletePopup isOpen={showLevelPopup} level={level} onAutoClose={handleNextLevel} />
            {isGameFinished && <GameEndModal score={score} timeInSeconds={elapsedTime} onRestart={handleRestart} />}
            {showGameOver && (
                <GameEndModal isGameOver={true} message="Game Over! You ran out of health." onRestart={handleRestart} />
            )}
        </div>
    );
}
