import axios from "axios";

function FPVCarInterface() {

  // FORWARD
  const moveForward = async () => {

    await axios.get("http://localhost:5000/forward");

    window.location.href = "/forward";
  };

  // BACKWARD
  const moveBackward = async () => {

    await axios.get("http://localhost:5000/backward");

    window.location.href = "/backward";
  };

  // LEFT
  const moveLeft = async () => {

    await axios.get("http://localhost:5000/left");

    window.location.href = "/left";
  };

  // RIGHT
  const moveRight = async () => {

    await axios.get("http://localhost:5000/right");

    window.location.href = "/right";
  };

  // STOP
  const stopCar = async () => {

    await axios.get("http://localhost:5000/stop");

    window.location.href = "/stop";
  };

  // FRONT LEFT
  const frontLeft = async () => {

    await axios.get("http://localhost:5000/frontleft");

    window.location.href = "/frontleft";
  };

  // FRONT RIGHT
  const frontRight = async () => {

    await axios.get("http://localhost:5000/frontright");

    window.location.href = "/frontright";
  };

  // BACK LEFT
  const backLeft = async () => {

    await axios.get("http://localhost:5000/backleft");

    window.location.href = "/backleft";
  };

  // BACK RIGHT
  const backRight = async () => {

    await axios.get("http://localhost:5000/backright");

    window.location.href = "/backright";
  };

  return (
    <div>

      <h1>FPV Car Controller</h1>

      <button onClick={moveForward }>
        Forward
      </button>

      <button onClick={moveBackward }>
        Backward
      </button>

      <button onClick={moveLeft }>
        Left
      </button>

      <button onClick={moveRight }>
        Right
      </button>

      <button onClick={stopCar }>
        Stop
      </button>

      <button onClick={frontLeft }>
        Front Left
      </button>

      <button onClick={frontRight }>
        Front Right
      </button>

      <button onClick={backLeft }>
        Back Left
      </button>

      <button onClick={backRight }>
        Back Right
      </button>

    </div>
  );
}

export default FPVCarInterface;