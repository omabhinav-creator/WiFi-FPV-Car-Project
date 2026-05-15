import { useEffect, useState } from "react";

export default function Dashboard() {
  const [action, setAction] = useState("STOP");

  const sendCommand = (cmd) => {
    setAction(cmd);
    console.log("Command:", cmd);

    // Example:
    // fetch(`http://YOUR_ESP32_IP/${cmd}`)
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
          sendCommand("FORWARD");
          break;

        case "s":
          sendCommand("BACKWARD");
          break;

        case "a":
          sendCommand("LEFT");
          break;

        case "d":
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

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#4dd0ff",
        }}
      >
        FPV DASHBOARD
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 80px 80px",
          gridTemplateRows: "80px 80px 80px",
          gap: "10px",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <div></div>

        <div className="control-btn">↑</div>

        <div></div>

        <div className="control-btn">←</div>

        <div
          style={{
            width: "80px",
            height: "80px",
            background: "#ff5722",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          STOP
        </div>

        <div className="control-btn">→</div>

        <div></div>

        <div className="control-btn">↓</div>

        <div></div>
      </div>

      <h2 style={{ marginTop: "30px" }}>
        Current Action: {action}
      </h2>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        W = Forward | S = Backward | A = Left | D = Right | Space = Stop
      </div>

      <style>{`
        .control-btn {
          width: 80px;
          height: 80px;
          background: rgba(0,255,255,0.5);
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          font-weight: bold;
          backdrop-filter: blur(5px);
        }
      `}</style>
    </div>
  );
}