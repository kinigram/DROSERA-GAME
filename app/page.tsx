"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const questions = [
  { q: "What is Drosera’s role in crypto?", options: ["Protect wallets", "Steal funds", "Promote scams"], answer: 0 },
  { q: "What do Drosera traps stop?", options: ["Wallet drains", "Price pumps", "Memes"], answer: 0 },
  { q: "Drosera operators are like…", options: ["Guards", "Hackers", "Bots"], answer: 1 },
  { q: "Traps activate when?", options: ["Suspicious activity", "Happy events", "Market dips"], answer: 0 },
  { q: "What’s safer with Drosera?", options: ["Your funds", "Nothing", "Scammers"], answer: 0 },
  { q: "Drosera builds trust by?", options: ["Stopping attacks", "Selling tokens", "Spreading FUD"], answer: 1 },
  { q: "Drosera protects against?", options: ["Drainers", "Streamers", "Gamers"], answer: 0 },
  { q: "Operators are…", options: ["Community protectors", "Attackers", "Spammers"], answer: 0 },
  { q: "Drosera mission is…", options: ["Security", "Chaos", "Drains"], answer: 2 },
  { q: "Drosera detects?", options: ["Suspicious contracts", "Memecoins", "AI art"], answer: 0 },
  { q: "Users can join as?", options: ["Operators", "Hackers", "Bots"], answer: 0 },
  { q: "Drosera traps = ?", options: ["Defense system", "Casino", "NFTs"], answer: 0 },
  { q: "Main risk Drosera fights?", options: ["Wallet drains", "Gas fees", "Lags"], answer: 0 },
  { q: "Drosera makes crypto…", options: ["Safer", "Riskier", "Scammy"], answer: 0 },
  { q: "Drosera helps…", options: ["Communities", "Scammers", "Spambots"], answer: 0 },
  { q: "Drosera protects…", options: ["Investors", "Attackers", "Scammers"], answer: 0 },
  { q: "Drosera traps stop…", options: ["Drainers", "Gamers", "Streamers"], answer: 0 },
  { q: "Drosera community = ?", options: ["Defenders", "Attackers", "Hackers"], answer: 0 },
  { q: "Drosera’s future = ?", options: ["Safe crypto", "More scams", "Uncertainty"], answer: 0 },
  { q: "Drosera slogan vibe?", options: ["Trap the threats", "Drain the wallets", "Ignore the hacks"], answer: 0 },
];

export default function Game() {
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const current = questions[level];
  const isLast = level === questions.length - 1;

  const handleAnswer = (index: number) => {
    if (selected !== null) return; // Prevent multiple clicks
    setSelected(index);

    if (index === current.answer) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
      setTimeout(() => {
        setSelected(null);
        if (!isLast) setLevel(level + 1);
      }, 1200);
    } else {
      setTimeout(() => setSelected(null), 1200);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center relative">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={isLast ? 600 : 200}
        />
      )}

      {/* Intro */}
      {level === 0 && selected === null && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <img src="/Drosera.jpg" alt="Logo" className="w-40 mx-auto" />
          <h1 className="text-4xl font-bold">TRAPNET</h1>
          <p className="text-xl">BY BIG KAYY</p>
          <button
            onClick={() => setLevel(1)}
            className="px-6 py-3 bg-purple-600 rounded-xl shadow-lg hover:bg-purple-700 transition"
          >
            Start Game
          </button>
        </motion.div>
      )}

      {/* Questions */}
      {level > 0 && level < questions.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 w-full max-w-lg"
        >
          <h2 className="text-2xl font-semibold">{current.q}</h2>
          <div className="space-y-3">
            {current.options.map((opt, idx) => {
              let bg = "bg-orange-200 border-2 border-black text-black";
              if (selected !== null) {
                if (idx === current.answer) bg = "bg-green-500 text-white";
                else if (idx === selected) bg = "bg-red-500 text-white";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`block w-full p-4 rounded-xl ${bg}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Final screen */}
      {isLast && selected === current.answer && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl font-bold text-green-400">🎉 You’re a Certified Trapper! 🎉</h1>
          <a
            href="https://twitter.com/intent/tweet?text=Hi%20I%20just%20completed%20the%20Trap%20Net%20Game%20by%20@kinigramm%20and%20I'm%20now%20a%20Certified%20Trapper%20😎%20join%20and%20play%20too%20https://drosera-game-j4j9.vercel.app/"
            target="_blank"
            className="block px-6 py-3 bg-blue-500 rounded-xl shadow hover:bg-blue-600"
          >
            Share on Twitter
          </a>
          <p className="text-lg">BY BIG KAYY</p>
        </motion.div>
      )}
    </div>
  );
      }
