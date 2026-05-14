import React, { useState, useEffect } from 'react';
import './fpvcarinterface.css';

export default function FPVCarInterface({ onBackToDashboard }) {
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(100);
  const [direction, setDirection] = useState("STOP");
  const [isMoving, setIsMoving] = useState(false);

  // 1. Practical Speed & Battery Logic
  useEffect(() => {
    let interval;
    if (isMoving && direction === "FORWARD") {
      interval = setInterval(() => {
        setSpeed(prev => Math.min(prev + 2, 45)); // Gradual acceleration to 45kmph
        setBattery(prev => Math.max(prev - 0.05, 10)); // Slow battery drain
      }, 500);
    } else if (!isMoving) {
      setSpeed(0);
    }
    return () => clearInterval(interval);
  }, [isMoving, direction]);

  const controlCar = (action) => {
    if (action === "STOP") {
      setIsMoving(false);
      setDirection("STOP");
    } else {
      setDirection(action);
      setIsMoving(true);
    }
    // Future: axios.get(`http://your-ngrok-url/${action.toLowerCase()}`);
  };

  return (
    <div className="interface-container">
      {/* 2. Full Screen YouTube Background */}
      <iframe 
        className="live-stream"
        src="https://www.natroad.com.au/wp-content/uploads/2023/02/Open-Road-iStock-120814631.jpg.webp" 
        title="FPV Feed"
        allow="autoplay; encrypted-media"
      ></iframe>

      <div className="dashboard-overlay">
        {}
        <div className="hud">
          <p>Speed: <span>{speed} km/h</span></p>
          <p>Battery: <span>{Math.floor(battery)}%</span></p>
          <p>Status: <span>{direction}</span></p>
        </div>

        {}
        <div className="controls-layout">
          <div className="row">
            <button className="nav-btn" onMouseDown={() => controlCar("FORWARD")} onMouseUp={() => controlCar("STOP")}>
              <i className="arrow up">↑</i>
            </button>
          </div>
          <div className="row middle">
            <button className="nav-btn" onMouseDown={() => controlCar("LEFT")} onMouseUp={() => controlCar("STOP")}>
              <i className="arrow left">←</i>
            </button>
            <button className="stop-btn-nav" onClick={onBackToDashboard}>
              <div className="stop-icon"></div>
            </button>
            <button className="nav-btn" onMouseDown={() => controlCar("RIGHT")} onMouseUp={() => controlCar("STOP")}>
              <i className="arrow right">→</i>
            </button>
          </div>
          <div className="row">
            <button className="nav-btn" onMouseDown={() => controlCar("BACKWARD")} onMouseUp={() => controlCar("STOP")}>
              <i className="arrow down">↓</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}