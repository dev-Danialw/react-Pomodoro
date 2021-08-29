import React, { useState, useRef } from "react";
import "./App.css";
//  Funtion for adding a 0 when there is a single digit
const padTime = (time) => {
  return time.toString().padStart(2, "0");
};

export default function App() {
  //  States
  const [timeLeft, setTimeLeft] = useState(15);
  const [title, setTitle] = useState("Let the countdown begin!!!");
  const [isRunning, setIsRunning] = useState(false);
  let intervalRef = useRef(null);

  //  Starting-Timer
  const startTimer = () => {
    if (intervalRef.current != null) return;

    setTitle("You're doing great!");
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        // reset timer
        resetTimer();
        return 0;
      });
    }, 1000);
  };

  //  Stoping-Timer
  const stopTimer = () => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("Keep it up!");
    setIsRunning(false);
  };

  // Reseting-Timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("Ready to go another Round?");
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  //  1. Logic for TIme i.e minutes and seconds
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
