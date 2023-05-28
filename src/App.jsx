import { Route, Routes } from 'react-router-dom';

import Container from './pages/Container';
import Login from './pages/Login';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import { useState } from 'react';

const App = () => {
  const [googleData, setGoogleData] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route
          index
          element={
            <Login googleData={googleData} setGoogleData={setGoogleData} />
          }
        />
        <Route path="home" element={<Home name={googleData?.name || ''} />} />
        <Route path="flashcards/:level" element={<Flashcards />} />
        <Route path="quiz/:id" element={<Quiz />} />
      </Route>
    </Routes>
  );
};

export default App;
