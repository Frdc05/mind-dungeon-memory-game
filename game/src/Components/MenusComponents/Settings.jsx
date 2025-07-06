import React, { useContext } from 'react';
import AngleLeft from "../Icon/AngleLeft";
import SoundOn from "../Icon/SoundOn";
import SoundOff from "../Icon/SoundOff";
import { SettingsContext } from "../../Context/AudioContext"; 

export default function Settings({ onBack }) {
    const { musicEnabled, setMusicEnabled, sfxEnabled, setSfxEnabled } = useContext(SettingsContext);

    return (
        <div className="min-h-screen w-full flex items-center justify-center font-jersey relative">
            <div className="relative z-10 w-full max-w-xl px-6 py-8 flex flex-col items-center text-center">

                {/* Judul */}
                <h1 className="text-5xl font-bold text-yellow-900 drop-shadow-[0_3px_2px_rgba(0,0,0,0.5)] mb-10">
                    Settings
                </h1>

                {/* Toggle Musik & SFX */}
                <div className="flex gap-12 mb-12">
                    {/* Music */}
                    <div className="flex flex-col items-center group">
                        <button
                            onClick={() => setMusicEnabled(!musicEnabled)}
                            className="bg-yellow-300 group-hover:bg-yellow-400 text-yellow-900 p-4 rounded-full shadow-inner active:translate-y-[2px] transition-all duration-150"
                        >
                            {musicEnabled ? <SoundOn w={24} h={24} /> : <SoundOff w={24} h={24} />}
                        </button>
                        <span className="text-yellow-900 text-lg mt-2 font-semibold">
                            Music: {musicEnabled ? 'On' : 'Off'}
                        </span>
                    </div>

                    {/* SFX */}
                    <div className="flex flex-col items-center group">
                        <button
                            onClick={() => setSfxEnabled(!sfxEnabled)}
                            className="bg-yellow-300 group-hover:bg-yellow-400 text-yellow-900 p-4 rounded-full shadow-inner active:translate-y-[2px] transition-all duration-150"
                        >
                            {sfxEnabled ? <SoundOn w={24} h={24} /> : <SoundOff w={24} h={24} />}
                        </button>
                        <span className="text-yellow-900 text-lg mt-2 font-semibold">
                            SFX: {sfxEnabled ? 'On' : 'Off'}
                        </span>
                    </div>
                </div>

                {/* Tombol Back di bawah */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 bg-yellow-300 hover:bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg shadow-md active:translate-y-[2px] transition-all duration-150"
                >
                    <AngleLeft w={20} h={20} />
                    Back to Menu
                </button>
            </div>
        </div>
    );
}
