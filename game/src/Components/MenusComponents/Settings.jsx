import React, { useState } from 'react';
import AngleLeft from "../Icon/AngleLeft";
import SoundOn from "../Icon/SoundOn";
import SoundOff from "../Icon/SoundOff";

export default function Settings({ onBack }) {
    const [musicOn, setMusicOn] = useState(true);
    const [sfxOn, setSfxOn] = useState(true);

    return (
        <div className="overflow-hidden w-full font-jersey">   
            <div className="relative flex flex-col items-center px-6">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 self-start bg-yellow-300 hover:bg-yellow-400 text-yellow-900 p-3 shadow-inner active:translate-y-[2px] transition-all duration-150"
                >   
                    <AngleLeft w={20} h={20} />
                    Back to Menu
                </button>

                {/* Title */}
                <h1 className="text-5xl text-yellow-900 font-bold drop-shadow-[0_3px_2px_rgba(0,0,0,0.5)] mb-10">
                    Settings
                </h1>

                {/* Settings Toggle */}
                <div className="flex gap-12">
                {/* Music */}
                <div className="flex flex-col items-center group">
                    <button
                    onClick={() => setMusicOn(!musicOn)}
                    className="bg-yellow-300 group-hover:bg-yellow-400 text-yellow-900 p-4 rounded-full shadow-inner active:translate-y-[2px] transition-all duration-150"
                    >
                    {musicOn ? <SoundOn w={24} h={24} /> : <SoundOff w={24} h={24} />}
                    </button>
                    <span className="text-yellow-900 text-lg mt-2">
                    Music: {musicOn ? 'On' : 'Off'}
                    </span>
                </div>

                {/* Sound Effects */}
                <div className="flex flex-col items-center group">
                    <button
                    onClick={() => setSfxOn(!sfxOn)}
                    className="bg-yellow-300 group-hover:bg-yellow-400 text-yellow-900 p-4 rounded-full shadow-inner active:translate-y-[2px] transition-all duration-150"
                    >
                    {sfxOn ? <SoundOn w={24} h={24} /> : <SoundOff w={24} h={24} />}
                    </button>
                    <span className="text-yellow-900 text-lg mt-2">
                    SFX: {sfxOn ? 'On' : 'Off'}
                    </span>
                </div>
                </div>
            </div>
        </div>
    );
}
