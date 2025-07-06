import React, { createContext, useEffect, useRef, useState } from 'react';

// Buat context
export const AudioContext = createContext();
export const SettingsContext = createContext();

// Provider utama
export function AudioProvider({ children }) {
    const [currentTrack, setCurrentTrack] = useState('bgm'); // 'bgm' or 'battle'
    const [musicEnabled, setMusicEnabled] = useState(true);

    const audioRefs = {
        bgm: useRef(new Audio('/game/public/sounds/bgm.ogg')),
        battle: useRef(new Audio('/sounds/battle.ogg')),
    };

    // Setup awal: looping dan volume 0
    useEffect(() => {
        Object.values(audioRefs).forEach(ref => {
            ref.current.loop = true;
            ref.current.volume = 0;
        });
    }, []);

    // Otomatis fade in/out saat status musik atau track berubah
    useEffect(() => {
        const audio = audioRefs[currentTrack]?.current;
        if (musicEnabled) {
            fadeIn(audio);
        } else {
            fadeOut(audio);
        }
    }, [musicEnabled, currentTrack]);

    // Fade In
    const fadeIn = (audio, targetVolume = 0.4, duration = 1500) => {
        audio.play();
        const step = targetVolume / (duration / 100);
        let volume = 0;
        audio.volume = 0;
        const fade = setInterval(() => {
            volume += step;
            if (volume >= targetVolume) {
                audio.volume = targetVolume;
                clearInterval(fade);
            } else {
                audio.volume = volume;
            }
        }, 100);
    };

    // Fade Out
    const fadeOut = (audio, duration = 1000) => {
        const step = audio.volume / (duration / 100);
        let volume = audio.volume;
        const fade = setInterval(() => {
            volume -= step;
            if (volume <= 0) {
                audio.volume = 0;
                audio.pause();
                clearInterval(fade);
            } else {
                audio.volume = volume;
            }
        }, 100);
    };

    // Ganti track musik
    const switchTrack = (newTrack, options = { reset: false }) => {
        const currentAudio = audioRefs[currentTrack]?.current;
        const nextAudio = audioRefs[newTrack]?.current;

        if (!nextAudio || currentTrack === newTrack) {
            if (options.reset && nextAudio) {
                nextAudio.currentTime = 0;
            }
            return;
        }

        fadeOut(currentAudio);

        if (options.reset) {
            nextAudio.currentTime = 0;
        }

        setCurrentTrack(newTrack); // trigger useEffect fadeIn
    };

    return (
        <AudioContext.Provider value={{
            musicEnabled,
            setMusicEnabled,
            currentTrack,
            switchTrack,
            playMusic: () => musicEnabled && fadeIn(audioRefs[currentTrack].current),
            pauseMusic: () => fadeOut(audioRefs[currentTrack].current),
        }}>
            {children}
        </AudioContext.Provider>
    );
}
