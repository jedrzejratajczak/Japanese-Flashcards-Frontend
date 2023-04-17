import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Background from './assets/background-flag.webp';
import BackgroundMusic from './assets/background-music.mp3';
import MusicIcon from './assets/music-icon.png';
import { useState } from 'react';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route path="home" element={<Home />} />
        <Route path="flashcards/:level" element={<Flashcards />} />
      </Route>
    </Routes>
  );
};

export default App;

const Container = () => {
  const audio = new Audio(BackgroundMusic);
  const [playing, setPlaying] = useState(false);

  audio.loop = true;
  audio.volume = 0.2;

  return (
    <>
      <Outlet />
      <img
        src={Background}
        className="fixed -z-50 inset-0 w-full h-full object-cover opacity-20"
      />
      <button
        className={`fixed h-10 w-10 top-4 right-5 ${
          playing ? '' : 'opacity-50'
        }`}
        onClick={() => {
          if (!playing) {
            audio.play();
            setPlaying(true);
          }
        }}
      >
        <img src={MusicIcon} />
      </button>
    </>
  );
};
