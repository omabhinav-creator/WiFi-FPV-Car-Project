import React, { useState } from 'react';
import FPVCarInterface from './FPVCarInterface';
import './App.css';

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = () => {
    const audio = new Audio('/Racing.mp3');
    audio.play();
    setIsStarted(true); 
  };

  return (
    <div className="App">
      {!isStarted ? (
        <div className="dashboard-container">
          <h1 className="main-title">WiFi FPV RACING</h1>
          <p className="tagline">Created by Team ABSS</p>
          <button className="start-btn" onClick={handleStart}>
            <img src="/Start.png" alt="Start Race" />
          </button>
        </div>
      ) : (
        <FPVCarInterface />
      )}
    </div>
  );
}

export default App;