import { Route, Routes } from 'react-router-dom';

import Container from './pages/Container';
import Login from './pages/Login';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import { useState } from 'react';

const App = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [googleData, setGoogleData] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Container setApiUrl={setApiUrl} />}>
        <Route
          index
          element={
            <Login
              apiUrl={apiUrl}
              googleData={googleData}
              setGoogleData={setGoogleData}
            />
          }
        />
        <Route path="home" element={<Home name={googleData?.name || ''} />} />
        <Route
          path="flashcards/:level"
          element={<Flashcards apiUrl={apiUrl} />}
        />
        <Route path="quiz/:id" element={<Quiz apiUrl={apiUrl} />} />
      </Route>
    </Routes>
  );
};

export default App;
