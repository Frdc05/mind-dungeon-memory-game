// WelcomeScreen.jsx
// Komponen layar pembuka utama Mind Dungeon Memory Game
// Menampilkan menu utama, rules, settings, dan setup game, serta mengelola musik latar
import React, { useContext, useEffect, useState } from 'react';
import Rules from './MenusComponents/Rules';
import Settings from './MenusComponents/Settings';
import Play from './Icon/Play';
import Gear from './Icon/Gear';
import Horn from './Icon/BullHorn';
import GameSetup from './MenusComponents/GameSetup';
import { AudioContext } from '../Context/AudioContext';

export default function WelcomeScreen() {
    // ===== STATE MENU DAN AUDIO =====
    const [menu, setMenu] = useState('main'); // Menu yang sedang aktif: main, play, rules, settings
    const { switchTrack, playMusic, currentTrack } = useContext(AudioContext); // Context audio
    const [hasPlayed, setHasPlayed] = useState(false); // Cegah pemutaran musik ganda
    
    // Set musik latar ke BGM saat masuk, dan kembalikan ke battle saat keluar
    useEffect(() => {
        switchTrack('bgm', { reset: true });
        return () => {
            switchTrack('batlle', { reset: false });
        };
    }, []);

    // Pastikan musik BGM diputar hanya sekali saat layar welcome
    useEffect(() => {
        if (!hasPlayed) {
            if (currentTrack !== 'bgm') {
                switchTrack('bgm', { reset: false });
            } else {
                playMusic(); 
            }
            setHasPlayed(true);
        }
    }, [hasPlayed, currentTrack, switchTrack, playMusic]);

    // ===== RENDER UI LAYAR WELCOME DAN MENU =====
    return (
        <div className="relative w-full min-h-screen overflow-hidden font-jersey">
            {/* Background utama */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="/Background/NatureBg/nature_5/origbig.png"
                    alt="Welcome Background"
                    className="absolute w-full h-full object-cover top-0 left-0 z-10 image-pixelated"
                />
            </div>

            {/* Konten utama dan menu */}
            <div className="relative z-50 flex flex-col items-center justify-center min-h-screen text-center text-white px-6 sm:px-10 md:px-16">
                {/* Menu utama */}
                {menu === 'main' && (
                    <>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-amber-300 drop-shadow-[0_3px_2px_rgba(0,0,0,0.7)] mb-4">
                            Mind Dungeon
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-emerald-100 drop-shadow-[0_2px_1px_rgba(0,0,0,0.5)] mb-8">
                            Match the card, beat the monster and be a hero!
                        </p>
                        <div className="flex gap-6">
                            {/* Tombol Rules */}
                            <div className="flex flex-col items-center group">
                                <button
                                    onClick={() => setMenu('rules')}
                                    className="bg-yellow-300 group-hover:bg-yellow-400 text-yellow-900 font-bold p-4 text-lg rounded-full shadow-inner tracking-widest active:translate-y-[2px] transition-all duration-150"
                                >
                                    <Horn w={24} h={24} className="text-yellow-900" />
                                </button>
                                <span className="text-lg sm:text-xl mt-2 text-yellow-200 group-hover:text-yellow-100 transition-colors duration-150">Game Rules</span>
                            </div>

                            {/* Tombol Play */}
                            <div className="flex flex-col items-center group">
                                <button
                                    onClick={() => setMenu('play')}
                                    className="bg-yellow-300 group-hover:bg-yellow-400 text-yellow-900 font-bold p-4 text-lg rounded-full shadow-inner tracking-widest active:translate-y-[2px] transition-all duration-150"
                                >
                                    <Play w={24} h={24} className="text-yellow-900" />
                                </button>
                                <span className="text-lg sm:text-xl mt-2 text-yellow-200 group-hover:text-yellow-100 transition-colors duration-150">Play Game</span>
                            </div>

                            {/* Tombol Settings */}
                            <div className="flex flex-col items-center group">
                                <button
                                    onClick={() => setMenu('settings')}
                                    className="bg-yellow-300 group-hover:bg-yellow-400 text-yellow-900 font-bold p-4 text-lg rounded-full shadow-inner tracking-widest active:translate-y-[2px] transition-all duration-150"
                                >
                                    <Gear w={24} h={24} className="text-yellow-900" />
                                </button>
                                <span className="text-lg sm:text-xl mt-2 text-yellow-200 group-hover:text-yellow-100 transition-colors duration-150">Settings</span>
                            </div>
                        </div>
                    </>
                )}

                {/* Menu Play, Rules, Settings */}
                {menu === 'play' && <GameSetup onBack={() => setMenu('main')} />}
                {menu === 'rules' && <Rules onBack={() => setMenu('main')} />}
                {menu === 'settings' && <Settings onBack={() => setMenu('main')} />}
            </div>
        </div>
    );
}
