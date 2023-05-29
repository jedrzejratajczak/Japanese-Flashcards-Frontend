import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [checkingAnswers, setCheckingAnswers] = useState(false);

  const getQuiz = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_GET_QUIZ_ENDPOINT}/${id}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    setQuiz(
      JSON.parse(
        data.quiz_content
          .replaceAll('\\\\', '§')
          .replaceAll('\\', '')
          .replaceAll('§', '\\')
          .slice(1, -1)
      )
    );
  };

  useEffect(() => {
    getQuiz();
  }, [id]);

  return (
    <div className="h-screen flex flex-col gap-6 items-center justify-center">
      <h1 className="text-5xl text-red-700 mb-2 font-semibold">QUIZ</h1>
      {quiz.map(({ id, kanji, hiragana, word }) => (
        <div key={id}>
          <div className="flex gap-5 items-center">
            <label
              htmlFor={id}
              className="flex flex-col text-center text-gray-600 text-sm"
            >
              <span>{kanji}</span>
              <span>{hiragana}</span>
            </label>
            <input
              type="text"
              name={id}
              id={id}
              disabled={checkingAnswers}
              className={`border-2 rounded px-2 py-1 text-gray-700 ${
                checkingAnswers
                  ? word.split(', ').includes(answers[id])
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-white'
              }`}
              onChange={(evt) =>
                setAnswers({ ...answers, [id]: evt.target.value })
              }
            />
          </div>
          {checkingAnswers && (
            <p className="text-center text-green-700 text-sm flex justify-between">
              {word.split(', ').map((word) => (
                <span key={word}>{word}</span>
              ))}
            </p>
          )}
        </div>
      ))}
      <button
        className="bg-white rounded px-6 py-2 hover:bg-slate-50 transition-colors"
        onClick={() => setCheckingAnswers(true)}
      >
        Check answers
      </button>
    </div>
  );
};

export default Quiz;
