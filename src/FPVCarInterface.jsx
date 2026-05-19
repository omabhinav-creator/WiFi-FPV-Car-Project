import React, { useEffect, useState, useRef } from "react";

export default function Dashboard() {
  const [signal, setSignal] = useState(85);
  const [direction, setDirection] = useState("STOP");
  const [action, setAction] = useState("STOP");
  const [isMuted, setIsMuted] = useState(false); // 🔥 Dynamic sound icon tracking state

  const audioRef = useRef(null); // 🔥 Music global component control pointer

const sendCommand = async (direction) => {
  setDirection(direction.toUpperCase());

  try {
    let endpoint = "";

    switch (direction.toUpperCase()) {
      case "FORWARD":
        endpoint = "forward";
        break;

      case "BACKWARD":
        endpoint = "backward";
        break;

      case "LEFT":
        endpoint = "left";
        break;

      case "RIGHT":
        endpoint = "right";
        break;

      case "STOP":
        endpoint = "stop";
        break;

      default:
        return;
    }

    const response = await fetch(
      `http://localhost:5000/${endpoint}`
    );

    const data = await response.text();

    console.log("Backend Response:", data);

  } catch (error) {
    console.log(error);
  }
};

  const getSignalStrength = () => {
    if (signal > 75) return "Strong";
    if (signal > 40) return "Medium";
    return "Weak";
  };

  // 1. KEYBOARD CONTROLS LISTENERS
 useEffect(() => {
  const handleKeyDown = (e) => {

    console.log("KEY PRESSED:", e.key);

    switch (e.key.toLowerCase()) {
      case "w":
      case "arrowup":
        sendCommand("FORWARD");
        break;

      case "s":
      case "arrowdown":
        sendCommand("BACKWARD");
        break;

      case "a":
      case "arrowleft":
        sendCommand("LEFT");
        break;

      case "d":
      case "arrowright":
        sendCommand("RIGHT");
        break;

      case " ":
        sendCommand("STOP");
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

  // 2. CINEMATIC BGM MUSIC LIFECYCLE USING REF MATCHING
  useEffect(() => {
    audioRef.current = new Audio("/SalaarBGM.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15; // Set low volume matrix

    audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // 3. TOGGLE SOUND FUNCTION (Click state logic handles mute/unmute)
  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.play().catch((err) => console.log(err));
      setIsMuted(false);
    } else {
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  // 4. SIGNAL STRENGTH SIMULATION INTERVAL
  useEffect(() => {
    const interval = setInterval(() => {
      const randomSignal = Math.floor(Math.random() * 100);
      setSignal(randomSignal);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
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
          top: -10,
          left: 60,
          color: "#006110",
          textShadow: "0 0 20px rgb(255, 255, 255)",
          fontSize: "40px",
        }}
      >
        FPV DASHBOARD
      </h1>

      {/* DYNAMIC MUTE/UNMUTE SPEAKER BUTTON */}
      <button
        onClick={toggleMute}
        style={{
          position: "absolute",
          top: "100px",
          right: "60px", // Dashboard Text pakkana uniform layout settings
          background: "rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(0, 255, 255, 0.3)",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "20px",
          boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)",
          transition: "transform 0.2s",
          zIndex: 10,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* DIRECTION DISPLAY */}
      <h2
        style={{
          position: "absolute",
          top: 5,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "30px",
          fontWeight: "bold",
          textShadow: "0 0 px rgba(17, 16, 16, 0.7)",
        }}
      >
        {direction}
      </h2>

      {/* TOP RIGHT STATUS BAR */}
      <div
        style={{
          position: "absolute",
          top: "28px",
          right: "60px",
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
        <div>
          <div>signal strength: {signal}% - {getSignalStrength()}</div>
        </div>
        <div>battery:🔋 92%</div>
        <div>speed:⚡ 25 km/h</div>
      </div>

      {/* CAMERA VIEW */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "94%",
          height: "84%",
          border: "2.5px solid rgba(15, 6, 6, 0.5)",
          borderRadius: "25px",
          backdropFilter: "blur(5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "40px",
          fontWeight: "bold",
          background: "rgba(0, 0, 0, 0.2)",
          color: "White",
        }}
      >
        FPV CAMERA VIEW
      </div>

      {/* LEFT & RIGHT CONTROLS */}
      <div
        style={{
          position: "absolute",
          bottom: "64px",
          left: "90px",
          display: "flex",
          flexDirection: "row",
          gap: "15px",
        }}
      >
        <button className="rect-btn" onClick={() => sendCommand("LEFT")}>
          ⬅ LEFT
        </button>
        <button className="rect-btn" onClick={() => sendCommand("RIGHT")}>
          RIGHT ➡
        </button>
      </div>

      {/* UP & DOWN CONTROLS */}
      <div
        style={{
          position: "absolute",
          bottom: "64px",
          right: "80px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <button className="rect-btn" onClick={() => sendCommand("FORWARD")}>
          ▲ ACCELERATE
        </button>

        <button className="rect-btn" onClick={() => sendCommand("BACKWARD")}>
          REVERSE
          <div>▼</div>
        </button>
      </div>

      {/* CENTER STOP CONTROL */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <button className="stop-center" onClick={() => sendCommand("stop")}>
          ⏹ STOP
        </button>
      </div>

      {/* CONTROLLER STYLE */}
      <style>{`
        .rect-btn {
          width: 120px;
          height: 60px;
          border: none;
          border-radius: 30px;
          font-size: 14px;
          font-weight: bold;
          color: white;
          cursor: pointer;
          background: rgba(5, 255, 255, 0.16);
          backdrop-filter: blur(10px);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.45);
          transition: 0.2s;
        }

        .rect-btn:hover {
          transform: scale(1.05);
          background: rgba(0, 255, 255, 0.35);
        }

        .rect-btn:active {
          transform: scale(0.95);
        }

        .stop-center {
          width: 100px;
          height: 55px;
          border: none;
          border-radius: 28px;
          font-size: 16px;
          font-weight: bold;
          color: white;
          cursor: pointer;
          background: linear-gradient(145deg, #ff1744, #b71c1c);
          box-shadow: 0 0 18px rgba(255, 0, 0, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease-in-out;
        }

        .stop-center:hover {
          transform: scale(1.08);
          box-shadow: 0 0 28px rgba(255, 0, 0, 0.9), 0 0 10px rgba(255, 0, 0, 0.5);
        }

        .stop-center:active {
          transform: scale(0.92);
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
        }

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