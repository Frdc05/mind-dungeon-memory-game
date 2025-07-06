// GameBoard.jsx
// Komponen utama papan permainan untuk Mind Dungeon Memory Game
// Mengelola state permainan, logika level, kartu, musuh, skor, waktu, efek suara, dan UI utama
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import CardFront from './CardFront';
import CardBack from './CardBack';
import PauseModal from './PauseModal';
import LevelCompletePopup from './LevelCompleteModal';
import GameEndModal from './EndGameModal'; 
import TimeUpModal from './GameOver';   
import levelData from './levels/levelData';
import cardPool from './levels/ItemsPool';
import enemiesPool from './levels/EnemiesPool';
import Sprite from '../Icon/Sprite';
import Heart from '../Icon/Heart';
import { AudioContext } from '../../Context/AudioContext';

export default function GameBoard() {
  // ===== STATE PERMAINAN =====
  const [level, setLevel] = useState(1); // Level permainan saat ini
  const [cards, setCards] = useState([]); // Semua kartu dalam level saat ini
  const [flipped, setFlipped] = useState([]); // Indeks kartu yang sedang terbuka
  const [matched, setMatched] = useState([]); // Indeks kartu yang sudah dicocokkan
  const [score, setScore] = useState(0); // Total skor pemain
  const [isPaused, setIsPaused] = useState(false); // Status pause permainan
  const [showLevelPopup, setShowLevelPopup] = useState(false); // Popup ketika menyelesaikan level
  const [isGameFinished, setIsGameFinished] = useState(false); // Status apakah game sudah selesai seluruh levelnya
  const [elapsedTime, setElapsedTime] = useState(180); // Sisa waktu permainan (detik)
  const [wrongCards, setWrongCards] = useState([]); // Indeks kartu yang salah dicocokkan
  const [playerHealth, setPlayerHealth] = useState(3); // Jumlah nyawa pemain (maksimal 3)
  const [showGameOver, setShowGameOver] = useState(false); // Status apakah modal game over harus ditampilkan
  const [attackEffect, setAttackEffect] = useState(''); // Efek animasi serangan ke musuh
  const [defenseEffect, setDefenseEffect] = useState(''); // Efek animasi menerima kerusakan
  const [streak, setStreak] = useState(0); // Jumlah streak (cocok beruntun)
  const [isReady, setIsReady] = useState(false); // Apakah permainan sudah siap dimulai
  const [finalTime, setFinalTime] = useState(0); // Waktu total menyelesaikan game
  const [lastCorrectTime, setLastCorrectTime] = useState(null); // Timestamp pencocokan kartu terakhir
  const [gameSessionId, setGameSessionId] = useState(0); // ID sesi game untuk reset
  const [sfxEnabled, setSfxEnabled] = useState(true); // Status efek suara aktif
  const [comboMessage, setComboMessage] = useState(''); // Pesan combo saat streak
  const [enemy, setEnemy] = useState(null); // Data musuh untuk level saat ini

  // ===== DATA PEMAIN DAN KONTEXT AUDIO =====
  const location = useLocation();
  const [playerName, setPlayerName] = useState(''); // Nama pemain
  const [avatarIndex, setAvatarIndex] = useState(0); // Indeks avatar pemain
  const { switchTrack } = useContext(AudioContext); // Fungsi ganti musik latar

  // ===== KONSTANTA LEVEL DAN BACKGROUND =====
  const maxLevel = levelData.length;
  const bgImage = levelData[level - 1]?.backgroundImage || '';

  // ===== HANDLER UNTUK MODAL PAUSE =====
  const handleRestartAndClose = () => {
    setIsPaused(false);       
    handleRestart();          // Reset game (fungsi reset yang sudah ada)
  };

  // Ambil nama dan avatar dari query string URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('name') || 'Player';
    const avatar = parseInt(params.get('avatar'), 10) || 0;
    setPlayerName(name);
    setAvatarIndex(avatar);
  }, [location.search]);

  // Fungsi untuk memainkan efek suara sesuai event
  const playSound = (type) => {
    if (!sfxEnabled) return;
    const sounds = {
      match: new Audio('/sounds/match.mp3'),
      mismatch: new Audio('/sounds/mismatch.mp3'),
      levelup: new Audio('/sounds/levelup.mp3'),
      gameover: new Audio('/sounds/gameover.mp3'),
    };
    sounds[type]?.play();
  };

  // Ganti musik latar ke battle saat game dimulai, kembali ke bgm saat keluar
  useEffect(() => {
    switchTrack('battle', { reset: true });
    return () => switchTrack('bgm', { reset: false });
  }, []);

  // Setup kartu dan musuh baru setiap kali level/gamesession berubah
  useEffect(() => {
    const data = levelData[level - 1];
    if (data) {
      // Pilih dan acak kartu
      const shuffledPool = [...cardPool].sort(() => Math.random() - 0.5);
      const selected = shuffledPool.slice(0, data.cardCount);
      const duplicated = [...selected, ...selected];
      const shuffled = duplicated.sort(() => Math.random() - 0.5).map((card, index) => ({ ...card, uid: index }));
      setCards(shuffled);
      setFlipped(shuffled.map((_, index) => index)); // Tampilkan semua kartu sebentar
      setMatched([]);
      setShowLevelPopup(false);
      setIsReady(false);

      // Pilih musuh acak
      const randomEnemy = enemiesPool[Math.floor(Math.random() * enemiesPool.length)];
      setEnemy(randomEnemy);

      // Setelah 3 detik, tutup semua kartu dan mulai game
      setTimeout(() => {
        setFlipped([]);
        setIsReady(true);
      }, 3000);
    }
  }, [level, gameSessionId]);

  // Timer utama permainan, mengurangi waktu dan nyawa setiap menit
  useEffect(() => {
    if (!isReady || isPaused) return;
    const timer = setInterval(() => {
      setElapsedTime((prev) => {
        const updated = prev - 1;
        if (updated <= 0) {
          clearInterval(timer);
          setShowGameOver(true);
          playSound('gameover');
          return 0;
        }
        // Setiap 60 detik, kurangi nyawa
        if (updated % 60 === 0 && updated !== 180) {
          setPlayerHealth((hp) => {
            if (hp <= 1) {
              setShowGameOver(true);
              playSound('gameover');
              return 0;
            }
            return hp - 1;
          });
        }
        return updated;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isReady, isPaused]);

  // Logika pencocokan kartu dan penilaian skor/streak
  useEffect(() => {
    if (!isReady) return;
    if (flipped.length === 2) {
      const [firstIdx, secondIdx] = flipped;
      if (cards[firstIdx].label === cards[secondIdx].label) {
        playSound('match');
        setAttackEffect('animate-attack');
        setTimeout(() => {
          setAttackEffect('');
          setMatched((prev) => [...prev, firstIdx, secondIdx]);
          const baseScore = 500;
          const bonus = cards[firstIdx].bonus || 0;
          const now = Date.now();
          const timeSinceLast = lastCorrectTime ? (now - lastCorrectTime) / 1000 : null;
          const isCombo = timeSinceLast !== null && timeSinceLast < 5;
          const streakBonus = isCombo ? 250 : 0;
          const newStreak = isCombo ? streak + 1 : 1;
          setStreak(newStreak);
          let message = '';
          if (isCombo && newStreak === 2) message = 'Combo!';
          else if (isCombo && newStreak === 3) message = 'Nice!';
          else if (isCombo && newStreak >= 4) message = 'Amazing!';
          setComboMessage(message);
          if (message) setTimeout(() => setComboMessage(''), 1200);
          setScore((prev) => prev + baseScore + bonus + streakBonus);
          setLastCorrectTime(now);
          setFlipped([]);
        }, 600);
      } else {
        playSound('mismatch');
        setDefenseEffect('animate-damage');
        setWrongCards([firstIdx, secondIdx]);
        setTimeout(() => {
          setFlipped([]);
          setWrongCards([]);
          setDefenseEffect('');
          setStreak(0);
          setLastCorrectTime(null);
        }, 1000);
      }
    }
  }, [flipped, cards, isReady]);

  // Cek apakah semua kartu sudah dicocokkan, lanjut ke level berikutnya atau selesai
  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length) {
      if (level < maxLevel) {
        setTimeout(() => {
          playSound('levelup');
          setShowLevelPopup(true);
        }, 500);
        setIsReady(false);
      } else if (!isGameFinished) {
        setFinalTime(180 - elapsedTime);
        setTimeout(() => setIsGameFinished(true), 500);
        setIsReady(false);
      }
    }
  }, [matched, cards, level, maxLevel, isGameFinished]);

  // Handler untuk membalik kartu
  const handleFlip = (index) => {
    if (!isReady || isPaused || flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;
    setFlipped([...flipped, index]);
  };

  // Handler untuk lanjut ke level berikutnya
  const handleNextLevel = () => {
    setShowLevelPopup(false);
    setLevel((prev) => prev + 1);
    setElapsedTime(180);
    setPlayerHealth(3);
    setMatched([]);
    setFlipped([]);
    setWrongCards([]);
    setIsReady(false);
  };

  // Handler untuk restart game dari awal
  const handleRestart = () => {
    setScore(0);
    setLevel(1);
    setPlayerHealth(3);
    setElapsedTime(180);
    setIsGameFinished(false);
    setShowGameOver(false);
    setGameSessionId((prev) => prev + 1);
  };

  // Handler untuk melanjutkan game dari pause
  const handleResume = () => setIsPaused(false);

  // Hitung jumlah kolom grid dan ukuran kartu dinamis
  const gridCols = cards.length <= 4 ? 2 : cards.length <= 6 ? 3 : cards.length <= 8 ? 4 : 5;
  const cardSize = Math.min(120, 600 / gridCols);
  const progress = cards.length > 0 ? matched.length / cards.length : 0;

  return (
    <div
      key={gameSessionId}
      className="w-full min-h-screen p-4 font-jersey text-center bg-cover bg-center flex flex-col items-center bg-no-repeat bg-fixed relative"
      style={{ backgroundImage: `url(${bgImage})`, imageRendering: 'pixelated' }}
    >
      {comboMessage && (
        <div className="absolute top-18 z-50 bg-yellow-300 text-yellow-900 font-bold text-4xl px-6 py-2 rounded-xl shadow-xl animate-fade-out">
          {comboMessage}
        </div>
      )}

      <HeaderBar
        progress={progress}
        onPause={() => setIsPaused(true)}
        timeLeft={elapsedTime}
        stage={level}
        score={score}
      />

      <div className="flex flex-col md:flex-row items-center justify-center w-full mt-6 gap-6">
        <div className="flex flex-col items-center self-center pt-10">
          <p className='w-full font-jersey text-yellow-200 text-4xl'>{playerName}</p>
          <div className="flex mb-2">
            {[...Array(3)].map((_, i) => (
              <Heart key={i} w={26} h={26} className={i < playerHealth ? 'text-red-500 fill-current' : 'text-gray-300 stroke-current'} />
            ))}
          </div>
          <Sprite charIndex={avatarIndex} scale={2.5} animate={true} className={defenseEffect} />
        </div>

        <div className="w-[800px] h-[600px] rounded-2xl shadow-lg flex items-center justify-center">
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
            {cards.map((card, index) => {
              const isFlipped = flipped.includes(index) || matched.includes(index);
              const isMatched = matched.includes(index);
              const isWrong = wrongCards.includes(index);
              return (
                <div
                  key={card.uid}
                  className={`aspect-[3/4] flex items-center justify-center perspective cursor-pointer transition-opacity duration-500 ${isMatched ? 'animate-fade-out pointer-events-none' : ''} ${isWrong ? 'animate-shake' : ''}`}
                  style={{ width: `${cardSize}px`, maxWidth: '100px' }}
                  onClick={() => handleFlip(index)}
                >
                  <div className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 ease-in-out ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                    <CardFront />
                    <CardBack image={card.image} point={card.bonus} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center pt-16">
          {enemy && (
            <>
              <p className='w-full font-jersey text-yellow-200 text-4xl'>{enemy.name}</p>
              <img src={enemy.image} alt={enemy.name} className={`w-36 h-36 object-contain ${attackEffect}`} />
            </>
          )}
        </div>
      </div>

            {isPaused && (
                <PauseModal
                    onResume={handleResume}
                    onRestart={handleRestartAndClose} // gunakan versi baru
                />
            )}

            {showLevelPopup && !isPaused && <LevelCompletePopup isOpen={true} level={level} onAutoClose={handleNextLevel} />}
            {showGameOver && !isPaused && <TimeUpModal score={score} stage={level} onRestart={handleRestart} onExit={() => window.location.reload()} />}
            {isGameFinished && !isPaused && <GameEndModal score={score} timeInSeconds={finalTime} onRestart={handleRestart} />}
        </div>
    );
}
