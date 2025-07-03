import React, { useState, useEffect } from 'react';
import HeaderBar from './HeaderBar';
import CardFront from './CardFront';
import CardBack from './CardBack';
import PauseModal from './PauseModal';
import LevelCompletePopup from './LevelCompleteModal';
import levelData from './levels/levelData';

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

    const maxLevel = Object.keys(levelData).length;
    const gridCols = levelData[level]?.grid || 4;
    const bgImage = levelData[level]?.background

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
                setMatched((prev) => [...prev, firstIdx, secondIdx]);
                setScore((prev) => prev + 1);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    }, [flipped, cards]);

    useEffect(() => {
        if (cards.length > 0 && matched.length === cards.length) {
            if (level === maxLevel) {
                const endTime = Date.now();
                setElapsedTime(Math.floor((endTime - startTime) / 1000));
                setTimeout(() => setIsGameFinished(true), 500);
            } else {
                setTimeout(() => setShowLevelPopup(true), 500);
            }
        }
    }, [matched, cards]);

    const handleFlip = (index) => {
        if (isPaused || flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;
        setFlipped([...flipped, index]);
    };

    const handleNextLevel = () => setLevel((prev) => prev + 1);

    const handleRestart = () => {
        setScore(0);
        setLevel(1);
        setIsGameFinished(false);
        setStartTime(Date.now());
    };


    // Ukuran dinamis kartu
    const cardSize = 600 / Math.ceil(cards.length / gridCols); // max tinggi container = 600px

    return (
        <div
            className="w-full min-h-screen p-4 font-jersey text-center bg-cover bg-center flex flex-col items-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <HeaderBar score={score} onPause={() => setIsPaused(true)} />

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
                        return (
                            <div
                                key={card.uid}
                                className="aspect-[3/4] flex items-center justify-center perspective"
                                style={{
                                    width: `${cardSize}px`,
                                    maxWidth: '100px',
                                }}
                                onClick={() => handleFlip(index)}
                            >
                                <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                                    <CardFront />
                                    <CardBack image={card.image} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {isPaused && <PauseModal onResume={() => setIsPaused(false)} onRestart={handleRestart} />}
                
            <LevelCompletePopup
                isOpen={showLevelPopup}
                level={level}
                onAutoClose={handleNextLevel}
            />

            {isGameFinished && (
                <GameEndModal
                    score={score}
                    timeInSeconds={elapsedTime}
                    onRestart={handleRestart}
                />
            )}
        </div>
    );
}
