import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Background from '../assets/background-flag.webp';
import BackgroundMusic from '../assets/background-music.mp3';
import MusicIcon from '../assets/music-icon.png';

const Container = ({ setApiUrl }) => {
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
      <div className="fixed bottom-2 right-2">
        <input
          className="rounded border-2 border-white px-2 py-1"
          type="text"
          placeholder="API URL"
          onChange={(evt) => setApiUrl(evt.target.value)}
        />
      </div>
    </>
  );
};

export default Container;
