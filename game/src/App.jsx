import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './Components/WelcomeScreen';
import GameBoard from './Components/GameplayComponents/GameBoard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/game" element={<GameBoard />} />
    </Routes>
  );
}
