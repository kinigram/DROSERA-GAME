"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import Confetti from "react-confetti";
import { TwitterShareButton } from "react-share";

// ----------------- Sounds -----------------
const correctSound = new Howl({ src: ["/sounds/correct.mp3"] });
const wrongSound = new Howl({ src: ["/sounds/wrong.mp3"] });
const winSound = new Howl({ src: ["/sounds/win.mp3"] });

// ----------------- Levels -----------------
const levels = [
  { question: "Who runs the Drosera client and responds to suspicious activity?", options: ["Network Operators", "Ethereum Foundation", "Random MetaMask Users"], answer: "Network Operators" },
  { question: "How does Drosera incentivize participants to react to threats?", options: ["Free NFTs", "DAO Voting", "Rewards for timely trap activation"], answer: "Rewards for timely trap activation" },
  // ... add all your 20 questions here ...
];

export default function Page() {
  const [started, setStarted] = useState(false);
  const [discordEntered, setDiscordEntered] = useState(false);
  const [discordName, setDiscordName] = useState("");
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [finalConfetti, setFinalConfetti] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (started && discordEntered && !finished) {
      if (timer === 0) {
        handleAnswer(null); // timeout counts as wrong
        setTimer(10);
      }
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [started, discordEntered, timer, finished]);

  const current = levels[level];
  const progressPercent = ((level) / levels.length) * 100;

  const handleAnswer = (option: string | null) => {
    if (option === current.answer) {
      correctSound.play();
      setScore(score + 1);
    } else {
      wrongSound.play();
    }

    if (level + 1 < levels.length) {
      setLevel(level + 1);
      setSelected(null);
      setTimer(10);
    } else {
      setFinished(true);
      winSound.play();
      if (score + (option === current.answer ? 1 : 0) === levels.length) setFinalConfetti(true);
    }
  };

  const replayGame = () => {
    setLevel(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setStarted(false);
    setDiscordEntered(false);
    setTimer(10);
    setFinalConfetti(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 animate-gradientGlow bg-gradient-to-r from-yellow-400 via-orange-600 to-black">
      
      {/* PROGRESS BAR */}
      {started && discordEntered && !finished && (
        <div className="w-full max-w-2xl h-4 bg-gray-300 rounded-full mt-4 mb-6">
          <div className="h-4 rounded-full bg-green-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      )}

      {/* INTRO SCREEN */}
      {!started && (
        <motion.div
          className="text-center max-w-xl relative"
          animate={{ backgroundColor: ["#000000", "#FF6600", "#000000"] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ padding: "40px", borderRadius: "20px" }}
        >
          <h1 className="text-6xl font-extrabold mb-4">DROSERA NETWORK</h1>
          <h2 className="text-5xl font-bold mb-4">TRAPNET</h2>
          <p className="text-lg mb-6">BY BIG KAYY</p>
          <button
            onClick={() => setStarted(true)}
            className="bg-orange-600 px-6 py-3 rounded-xl text-lg hover:bg-orange-500"
          >
            Start Game
          </button>
        </motion.div>
      )}

      {/* DISCORD NAME INPUT */}
      {started && !discordEntered && (
        <div className="text-center max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Enter Discord Username</h2>
          <input
            type="text"
            placeholder="Discord Username"
            value={discordName}
            onChange={(e) => setDiscordName(e.target.value)}
            className="p-3 rounded-xl text-black w-full mb-4"
          />
          <button
            onClick={() => discordName && setDiscordEntered(true)}
            className="bg-green-600 px-6 py-3 rounded-xl text-lg hover:bg-green-500"
          >
            Continue
          </button>
        </div>
      )}

      {/* LEVELS */}
      {started && discordEntered && !finished && (
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold mb-2">Discord: {discordName}</h2>
          <h2 className="text-2xl font-bold mb-6">Level {level + 1} of {levels.length} | Timer: {timer}s</h2>
          <p className="mb-6 text-lg">{current.question}</p>
          <div className="space-y-4">
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 rounded-xl border-2 transition ${
                  selected === option
                    ? option === current.answer
                      ? "bg-green-600 border-black"
                      : "bg-red-600 border-black"
                    : "bg-orange-500 hover:bg-orange-400 border-black"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FINISH SCREEN */}
      {finished && (
        <div className="text-center max-w-xl relative">
          {finalConfetti && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={500} />}
          <h1 className="text-4xl font-bold mb-4">🎉 Game Over 🎉</h1>
          <p className="text-2xl mb-6">Your Score: {score}/{levels.length}</p>

          {score === levels.length ? (
            <>
              <p className="text-xl mb-6">Perfect! You are now a Certified Trapper 😎</p>
              <TwitterShareButton
                url="https://drosera-game-j4j9.vercel.app/"
                title={`Hi! I just completed the TrapNet Game by @kinigramm and scored 20/20. I'm now a Certified Trapper 😎! Join and play too 👉`}
              >
                <button className="bg-blue-500 px-6 py-3 rounded-xl text-lg hover:bg-blue-400 mb-4">Share on X</button>
              </TwitterShareButton>
              <a
                href="https://discord.gg/drosera"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#5865F2] px-6 py-3 rounded-xl text-lg text-white hover:bg-blue-500 mb-4 inline-block"
              >
                Follow on Discord
              </a>
              <button
                onClick={replayGame}
                className="bg-green-500 px-6 py-3 rounded-xl text-lg hover:bg-green-400"
              >
                Replay Game
              </button>
            </>
          ) : (
            <>
              <p className="text-xl mb-6">You didn’t complete all levels. Try again to get 20/20!</p>
              <button
                onClick={replayGame}
                className="bg-green-500 px-6 py-3 rounded-xl text-lg hover:bg-green-400"
              >
                Replay Game
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
        }
