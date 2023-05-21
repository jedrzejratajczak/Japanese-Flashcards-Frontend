import { Route, Routes } from 'react-router-dom';

import Container from './pages/Container';
import Login from './pages/Login';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import { useState } from 'react';

const App = () => {
  const [apiUrl, setApiUrl] = useState('');

  return (
    <Routes>
      <Route path="/" element={<Container setApiUrl={setApiUrl} />}>
        <Route index element={<Login apiUrl={apiUrl} />} />
        <Route path="home" element={<Home />} />
        <Route
          path="flashcards/:level"
          element={<Flashcards apiUrl={apiUrl} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
