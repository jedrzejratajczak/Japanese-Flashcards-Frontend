import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import ChevronRight from '../assets/chevron-right.svg';
import {
  kanjiBackgrounds,
  kanjiColors,
  kanjiIcons
} from '../assets/kanjiIcons';

const Home = ({ name }) => {
  useEffect(() => {
    document.title = `Home | Welcome, ${name}!`;
  }, [name]);

  return (
    <div className="h-screen flex flex-col justify-center w-fit m-auto px-6">
      <h1 className="text-5xl mb-2 font-semibold">
        Good morning, <span className="text-red-700">{name}</span>!
      </h1>
      <h2 className="text-lg font-medium text-gray-500 mb-10">
        Discover new words by choosing one of the 5 levels below.
      </h2>
      <div className="flex flex-col gap-2 items-center">
        {[1, 2, 3, 4, 5].map((level) => (
          <LevelCard key={level} level={level} />
        ))}
      </div>
    </div>
  );
};

export default Home;

const LevelCard = ({ level }) => {
  return (
    <Link
      to={`/flashcards/${level}`}
      className={`flex font-semibold items-center justify-center gap-12 w-max rounded-2xl cursor-pointer ${kanjiBackgrounds[level]} transition-colors`}
    >
      <span
        className={`w-14 h-14 rounded-2xl text-white text-2xl flex items-center justify-center drop-shadow-lg ${kanjiColors[level]}`}
      >
        {kanjiIcons[level]}
      </span>
      <span>JLPT-N{level}</span>
      <img src={ChevronRight} className="px-4 h-4" />
    </Link>
  );
};
