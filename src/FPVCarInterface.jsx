import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [signal, setSignal] = useState(85);
  const [direction, setDirection] = useState("STOP");
  const [action, setAction] = useState("STOP");

 const sendCommand = async (direction) => {

  setDirection(direction.toUpperCase());

  try {

    const response = await fetch(
      `http://localhost:5000/${direction}`
    );

    const data = await response.text();

    console.log(data);

  } catch (error) {

    console.log(error);

  }
};
const getSignalStrength = () => {

  if (signal > 75) {
    return "Strong";
  }

  if (signal > 40) {
    return "Medium";
  }

  return "Weak";
};

 useEffect(() => {

  const handleKeyDown = (e) => {

    switch (e.key.toLowerCase()) {

      case "w":
        sendCommand("forward");
        break;

      case "s":
        sendCommand("backward");
        break;

      case "a":
        sendCommand("left");
        break;

      case "d":
        sendCommand("right");
        break;

      case " ":
        sendCommand("stop");
        break;

      default:
        break;
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };

}, []);
useEffect(() => {

  const interval = setInterval(() => {

    const randomSignal =
      Math.floor(Math.random() * 100);

    setSignal(randomSignal);

  }, 3000);

  return () => clearInterval(interval);

}, []);
  return (
    <div
  style={{
    height: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
    color: "white",
    fontFamily: "Arial",
  }}
>

  {/* TOP TITLE */}
  <h1
    style={{
      position: "absolute",
      top: 20,
      left: 20,
      color: "#160202f5",
      fontSize: "40px",
    }}
  >
    FPV DASHBOARD
  </h1>

  {/* DIRECTION DISPLAY */}
  <h2
    style={{
      position: "absolute",
      top: 30,
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "35px",
      fontWeight: "bold",
    }}
  >
    {direction}
  </h2>
{/* TOP RIGHT STATUS BAR */}
<div
  style={{
    position: "absolute",
    top: "20px",
    right: "30px",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    color: "white",
    fontSize: "14px",
    fontWeight: "bold",
    background: "rgba(0,0,0,0.3)",
    padding: "8px 14px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
  }}
>

  {/* SIGNAL */}
  <div>
    <div>
  signal strength: {signal}% - {getSignalStrength()}
</div>
  </div>

  {/* BATTERY */}
  <div>
    battery:🔋 92%
  </div>

  {/* SPEED */}
  <div>
    speed:⚡ 25 km/h
  </div>

</div>
  {/* CAMERA VIEW */}
  <div
    style={{
      position: "absolute",
      top: "15%",
      left: "50%",
      transform: "translateX(-50%)",
      width: "75%",
      height: "55%",
      border: "4px solid rgba(15, 6, 6, 0.5)",
      borderRadius: "25px",
      backdropFilter: "blur(5px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "40px",
      fontWeight: "bold",
      background: "rgba(0,0,0,0.2)",
      color:"white",
    }}
  >
    FPV CAMERA VIEW
  </div>

  {/* LEFT CONTROLS */}
<div
  style={{
    position: "absolute",
    bottom: "40px",
    left: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  }}
>
  <button className="rect-btn" onClick={() => sendCommand("left")}>
    ⬅ LEFT
  </button>
  <button className="rect-btn" onClick={() => sendCommand("right")}>
    RIGHT ➡
  </button>
</div>

 {/* RIGHT CONTROLS */}
<div
  style={{
    position: "absolute",
    bottom: "40px",
    right: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  }}
>
  <button className="rect-btn" onClick={() => sendCommand("FORWARD")}>
  ▲ ACCELERATE
</button>

   <button className="rect-btn" onClick={() => sendCommand("BACKWARD")}>
    ▼ REVERSE
  </button>
</div>

  {/* CENTER STOP CONTROL */}
<div
  style={{
    
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
  }}
>
  <button
    className="stop-center"
    onClick={() => sendCommand("stop")}
  >
    ⏹ STOP
  </button>
</div>

  {/* CONTROLLER STYLE */}
  <style>{`

.rect-btn {
  width: 120px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  cursor: pointer;

  background: rgba(0, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
  transition: 0.2s;
}

.rect-btn:hover {
  transform: scale(1.05);
  background: rgba(0, 255, 255, 0.35);
}

.rect-btn:active {
  transform: scale(0.95);
}

/* STOP SMALL BUTTON */
.stop-center {
  width: 140px;
  height: 55px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  cursor: pointer;

  background: linear-gradient(145deg, #ff1744, #b71c1c);

  box-shadow:
    0 0 18px rgba(255, 0, 0, 0.6),
    inset 0 0 10px rgba(255, 255, 255, 0.2);

  transition: all 0.2s ease-in-out;
}

/* 🔥 hover bubble effect */
.stop-center:hover {
  transform: scale(1.08);
  box-shadow:
    0 0 28px rgba(255, 0, 0, 0.9),
    0 0 10px rgba(255, 0, 0, 0.5);
}

/* 🎮 click press effect */
.stop-center:active {
  transform: scale(0.92);
  box-shadow:
    0 0 10px rgba(255, 0, 0, 0.5);
}
/* PEDALS (REAL RACING STYLE) */
.pedal {
  width: 160px;
  height: 60px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  letter-spacing: 1px;

  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  transition: 0.15s;
}

.pedal:active {
  transform: scale(0.95);
}

.forward {
  background: linear-gradient(145deg, #117243, #00c853);
}

.backward {
  background: linear-gradient(145deg, #2979ff, #1565c0);
}
  `}</style>

</div>
  );
}