import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MacroCalculator from './pages/MacroCalculator';
import MainScreen from './pages/MainScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-snes-grey">
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/macro-calculator" element={<MacroCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
