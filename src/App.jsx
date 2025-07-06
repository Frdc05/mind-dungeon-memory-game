import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import WelcomeScreen from './Components/WelcomeScreen';
import GameBoard from './Components/GameplayComponents/GameBoard';
import { SettingsContext } from './Context/AudioContext';

export default function App() {
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);

  return (
    <SettingsContext.Provider value={{ musicEnabled, setMusicEnabled, sfxEnabled, setSfxEnabled }}>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/game" element={<GameBoard />} />
      </Routes>
    </SettingsContext.Provider>
  );
}
