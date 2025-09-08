"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { TwitterShareButton } from "react-share";

// ---------------- Questions ----------------
const questions = [
  {
    q: "Who runs the Drosera client and responds to suspicious activity?",
    options: ["Network Operators", "Only Ethereum Foundation Developers", "Random MetaMask Users"],
    answer: "Network Operators", // A
  },
  {
    q: "How does Drosera incentivize participants to react to threats?",
    options: ["Free NFTs", "Rewards for timely trap activation", "DAO voting"],
    answer: "Rewards for timely trap activation", // B
  },
  {
    q: "Which projects are already collaborating with Drosera on Testnet?",
    options: ["Ion Protocol, Etherfi, Gravita", "Binance, Coinbase, Kraken", "None yet"],
    answer: "Ion Protocol, Etherfi, Gravita", // A
  },
  {
    q: "What is the role of Traps in the Drosera system?",
    options: ["Detect suspicious activity and trigger emergency actions", "Generate new tokens for participants", "Store NFTs"],
    answer: "Detect suspicious activity and trigger emergency actions", // A
  },
  {
    q: "What happens if a threat is detected by Drosera?",
    options: ["It ignores the threat", "Emergency response actions are triggered", "The system shuts down forever"],
    answer: "Emergency response actions are triggered", // B
  },
  {
    q: "Who can participate in running traps?",
    options: ["Only Ethereum devs", "Any network operator", "Casual wallet users"],
    answer: "Any network operator", // B
  },
  {
    q: "What makes Drosera different from traditional monitoring tools?",
    options: ["It rewards active defenders", "It is slower but safer", "It only works with MetaMask"],
    answer: "It rewards active defenders", // A
  },
  {
    q: "What are traps mainly designed to do?",
    options: ["Delay confirmations", "Detect & stop exploits", "Vote on DAO proposals"],
    answer: "Detect & stop exploits", // B
  },
  {
    q: "If you fail a level twice, what happens?",
    options: ["You are blocked", "You restart that level", "Game ends completely"],
    answer: "You restart that level", // B
  },
  {
    q: "Why is quick reaction important in Drosera?",
    options: ["It prevents financial loss", "It mints NFTs", "It makes memes"],
    answer: "It prevents financial loss", // A
  },
  {
    q: "What is the final reward of the Trap Net Game?",
    options: ["Certified Trapper title", "ETH airdrop", "Free NFT"],
    answer: "Certified Trapper title", // A
  },
  {
    q: "Drosera traps are activated when?",
    options: ["Randomly every day", "When suspicious activity is detected", "Only during DAO votes"],
    answer: "When suspicious activity is detected", // B
  },
  {
    q: "What type of system is Drosera?",
    options: ["Security monitoring & response", "NFT marketplace", "Wallet provider"],
    answer: "Security monitoring & response", // A
  },
  {
    q: "Drosera encourages operators by?",
    options: ["Providing memes", "Giving rewards", "Letting them stake tokens"],
    answer: "Giving rewards", // B
  },
  {
    q: "The core idea of Drosera is?",
    options: ["Trap & respond", "Only governance", "Just staking"],
    answer: "Trap & respond", // A
  },
  {
    q: "If no one responds to a trap?",
    options: ["Attack might succeed", "System ignores it", "It becomes a DAO vote"],
    answer: "Attack might succeed", // A
  },
  {
    q: "Who benefits most from Drosera’s security?",
    options: ["Only developers", "Everyone in the ecosystem", "Just wallets"],
    answer: "Everyone in the ecosystem", // B
  },
  {
    q: "Drosera is best described as?",
    options: ["Community defense layer", "NFT gallery", "Random trading bot"],
    answer: "Community defense layer", // A
  },
  {
    q: "How many tries per level are allowed?",
    options: ["1", "2", "Unlimited"],
    answer: "2", // B
  },
  {
    q: "Finishing all levels makes you?",
    options: ["Certified Trapper", "DAO leader", "ETH whale"],
    answer: "Certified Trapper", // A
  },
];

export default function Game() {
  const [started, setStarted] = useState(false);
  const [discordName, setDiscordName] = useState("");
  const [level, setLevel] = useState(0);
  const [triesLeft, setTriesLeft] = useState(2);
  const [selected, setSelected] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Handle answer selection
  const handleAnswer = (choice: string) => {
    setSelected(choice);
    if (choice === questions[level].answer) {
      // Correct
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);

      setTimeout(() => {
        if (level + 1 === questions.length) {
          setCompleted(true);
        } else {
          setLevel(level + 1);
          setTriesLeft(2);
          setSelected("");
        }
      }, 1200);
    } else {
      // Wrong
      if (triesLeft - 1 <= 0) {
        setTriesLeft(2);
        setSelected("");
      } else {
        setTriesLeft(triesLeft - 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-500 text-white p-6">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      {completed && <Confetti recycle={false} numberOfPieces={800} />}

      {/* Intro Screen */}
      {!started && !completed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Image src="/Drosera.jpg" alt="TrapNet Logo" width={250} height={250} />
          <h1 className="text-5xl font-bold mt-6">TRAPNET</h1>
          <p className="mt-2 text-lg">BY BIG KAYY</p>
          <button
            onClick={() => setStarted(true)}
            className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            New Game
          </button>
        </motion.div>
      )}

      {/* Name Input */}
      {started && discordName === "" && !completed && (
        <div className="flex flex-col items-center">
          <p className="mb-4">Enter Discord Name</p>
          <input
            type="text"
            className="p-3 rounded-lg text-black bg-yellow-300"
            onChange={(e) => setDiscordName(e.target.value)}
          />
          <button
            onClick={() => discordName && setDiscordName(discordName)}
            className="mt-4 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
          >
            Continue
          </button>
        </div>
      )}

      {/* Game Levels */}
      {discordName !== "" && !completed && (
        <div className="w-full max-w-2xl text-center">
          <Image src="/Drosera.jpg" alt="TrapNet Logo" width={120} height={120} className="mx-auto" />
          <h2 className="text-2xl font-bold mb-4">Level {level + 1} of {questions.length}</h2>
          <p className="mb-6">{questions[level].q}</p>
          <div className="space-y-4">
            {questions[level].options.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(choice)}
                className={`w-full p-4 rounded-lg border-2 border-black 
                ${selected === "" ? "bg-[#FFD580]" : 
                  choice === questions[level].answer && selected === choice ? "bg-green-500" : 
                  selected === choice ? "bg-red-500" : "bg-[#FFD580]"}`}
              >
                {choice}
              </button>
            ))}
          </div>
          <p className="mt-4">Tries left: {triesLeft}</p>
        </div>
      )}

      {/* Completion Screen */}
      {completed && (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
          <h1 className="text-4xl font-bold mb-4">YOU ARE NOW A CERTIFIED TRAPPER 🎉</h1>
          <TwitterShareButton
            url="https://drosera-game-j4j9.vercel.app/"
            title="Hi I just completed the Trap Net Game by @kinigramm and I'm now a Certified Trapper 😎 join and play too"
          >
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
              Share on Twitter
            </button>
          </TwitterShareButton>
          <p className="mt-3">BY BIG KAYY</p>
        </motion.div>
      )}
    </div>
  );
    }
