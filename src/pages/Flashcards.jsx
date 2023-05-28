import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Flashcard } from 'react-quizlet-flashcard';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import ArrowBack from '../assets/arrow-back.svg';

const Flashcards = () => {
  const { level } = useParams();
  const flipRef = useRef();
  const [flashcard, setFlashcard] = useState(null);
  const loading = !flashcard;
  const [flipped, setFlipped] = useState(false);

  const flipFlashcard = () => {
    flipRef.current();
    setFlipped((flipped) => !flipped);
  };

  const getFlashcard = async (shouldFlip = false) => {
    if (shouldFlip) flipFlashcard();

    const { data } = await axios.get(`${apiUrl}/flashcards/${level}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    setFlashcard(data);
  };

  useEffect(() => {
    document.title = `Flashcards | JLPT-N${level}`;
    getFlashcard(false);
  }, [level]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center px-6">
      <Link
        to="/home"
        className="fixed top-4 left-5 border-black border-2 rounded-full p-3 cursor-pointer hover:bg-white transition-colors"
      >
        <img src={ArrowBack} className="w-5" />
      </Link>
      <p className="text-4xl font-semibold mb-2">
        Your current level is JLPT-N{level}.{' '}
        <span className="text-4xl font-semibold text-red-700 mb-2">
          Ganbatte!
        </span>
      </p>
      <p className="text-base font-semibold text-gray-500 mb-6">
        If you wish to change the level, click the back icon in the top left
        corner.
      </p>
      <Flashcard
        className="w-full max-w-[560px] mb-6"
        manualFlipRef={flipRef}
        frontHTML={
          <FlashcardContainer
            flipFlashcard={flipFlashcard}
            loading={loading}
            words={flashcard?.words}
          />
        }
        backHTML={
          <FlashcardContainer
            flipFlashcard={flipFlashcard}
            flipped={flipped}
            loading={loading}
            kanji={flashcard?.kanji}
            hiragana={flashcard?.hiragana}
          />
        }
      />
      <button
        className="rounded-lg py-2 px-6 text-xl font-medium bg-white"
        onClick={() => getFlashcard(flipped)}
      >
        Continue
      </button>
    </div>
  );
};

export default Flashcards;

const FlashcardContainer = ({
  flipFlashcard,
  flipped = false,
  loading,
  words,
  kanji,
  hiragana
}) => (
  <div
    onClick={flipFlashcard}
    className="px-8 w-full h-full flex items-center justify-center cursor-pointer"
  >
    {loading ? (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="rgb(239, 68, 68)"
        visible={true}
      />
    ) : words ? (
      <p className="text-4xl text-center font-semibold">{words}</p>
    ) : flipped ? (
      <p className="flex font-semibold flex-col items-center gap-6">
        <span className="text-6xl">{kanji}</span>
        <span className="text-4xl">{hiragana}</span>
      </p>
    ) : (
      <></>
    )}
  </div>
);
