import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Главная</div>} />
        <Route path="/chat" element={<div>Чат</div>} />
      </Routes>
    </Router>
  );
}

export default App;

