import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


// HOME
app.get("/", (req, res) => {
    res.send("FPV Backend Running");
});


// FORWARD
app.get("/forward", (req, res) => {

    console.log("Moving forward");

    res.send("Forward");
});


// BACKWARD
app.get("/backward", (req, res) => {

    console.log("Moving backward");

    res.send("Backward");
});


// LEFT
app.get("/left", (req, res) => {

    console.log("Moving left");

    res.send("Left");
});


// RIGHT
app.get("/right", (req, res) => {

    console.log("Moving right");

    res.send("Right");
});


// STOP
app.get("/stop", (req, res) => {

    console.log("Stopping");

    res.send("Stop");
});


// FRONT LEFT
app.get("/frontleft", (req, res) => {

    console.log("Moving front left");

    res.send("Front Left");
});


// FRONT RIGHT
app.get("/frontright", (req, res) => {

    console.log("Moving front right");

    res.send("Front Right");
});


// BACK LEFT
app.get("/backleft", (req, res) => {

    console.log("Moving back left");

    res.send("Back Left");
});


// BACK RIGHT
app.get("/backright", (req, res) => {

    console.log("Moving back right");

    res.send("Back Right");
});


// START SERVER
app.listen(5000, () => {

    console.log("Backend running on port 5000");
});