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
  { question: "Which projects are already collaborating with Drosera on Testnet?", options: ["Binance, Coinbase, Kraken", "Ion Protocol, Etherfi, Gravita", "Uniswap, Aave, Curve"], answer: "Ion Protocol, Etherfi, Gravita" },
  { question: "What is the role of Traps in the Drosera system?", options: ["Detect suspicious activity and trigger emergency actions", "Create memes on Discord", "Generate new tokens for participants"], answer: "Detect suspicious activity and trigger emergency actions" },
  { question: "Drosera focuses on securing which ecosystem first?", options: ["Ethereum & L2s", "Bitcoin Mining", "Solana Only"], answer: "Ethereum & L2s" },
  { question: "What happens when a trap is triggered?", options: ["Funds are instantly protected", "NFT airdrop happens", "Nothing, it's just logged"], answer: "Funds are instantly protected" },
  { question: "What’s a common crypto scam Drosera can help mitigate?", options: ["Pump-and-dump", "Wallet drain", "Memecoin hype"], answer: "Wallet drain" },
  { question: "Who benefits most from Drosera’s protection system?", options: ["DeFi protocols & users", "Traditional banks", "Video game companies"], answer: "DeFi protocols & users" },
  { question: "What happens if no operator responds to a trap?", options: ["Trap expires after a timeout", "ETH airdrop", "Permanent ban"], answer: "Trap expires after a timeout" },
  { question: "Drosera helps secure what type of crypto infrastructure?", options: ["Bridges, L2s, DeFi protocols", "Mining rigs", "NFT marketplaces only"], answer: "Bridges, L2s, DeFi protocols" },
  { question: "Which one is NOT a risk Drosera directly protects against?", options: ["Smart contract exploits", "Phishing emails", "Protocol drains"], answer: "Phishing emails" },
  { question: "What powers the decision-making in Drosera traps?", options: ["Community operators", "AI only", "Government regulations"], answer: "Community operators" },
  { question: "Why is decentralization important in Drosera?", options: ["No single point of failure", "Faster airdrops", "Cheaper gas fees"], answer: "No single point of failure" },
  { question: "Which one best describes Drosera?", options: ["A decentralized security network", "A meme coin project", "A crypto wallet app"], answer: "A decentralized security network" },
  { question: "How do traps get triggered?", options: ["By suspicious on-chain activity", "By meme votes", "Randomly every hour"], answer: "By suspicious on-chain activity" },
  { question: "Drosera’s incentives are designed to reward:", options: ["Timely response to traps", "Buying NFTs", "Holding ETH only"], answer: "Timely response to traps" },
  { question: "Which group is critical to Drosera’s ecosystem?", options: ["Operators", "Gamers", "Miners"], answer: "Operators" },
  { question: "What’s the ultimate goal of Drosera?", options: ["Secure DeFi and protect users", "Launch new meme coins", "Centralize Ethereum security"], answer: "Secure DeFi and protect users" },
  { question: "What type of attack did your brother lose $130 to, that Drosera helps prevent?", options: ["Wallet drain", "51% attack", "Rugpull on Solana"], answer: "Wallet drain" },
  { question: "Completing this TrapNet Game makes you a certified?", options: ["Trapper 😎", "Miner", "NFT flipper"], answer: "Trapper 😎" },
];

export default function Game() {
  const [started, setStarted] = useState(false);
  const [discordName, setDiscordName] = useState("");
  const [discordEntered, setDiscordEntered] = useState(false);
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const current = levels[level];

  // Window resize for Confetti
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
    if (!started || finished || !discordEntered) return;
    if (timer <= 0) {
      nextQuestion(false);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, started, finished, discordEntered]);

  const checkAnswer = (option: string) => {
    setSelected(option);
    const isCorrect = option === current.answer;
    nextQuestion(isCorrect);
  };

  const nextQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      correctSound.play();
      setScore((s) => s + 1);
    } else {
      wrongSound.play();
    }

    setTimeout(() => {
      setSelected(null);
      setTimer(10);
      if (level + 1 < levels.length) {
        setLevel(level + 1);
      } else {
        setFinished(true);
        if (score + (isCorrect ? 1 : 0) === levels.length) {
          winSound.play();
        }
      }
    }, 1000);
  };

  const progressPercent = ((level) / levels.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 animate-gradientGlow bg-gradient-to-r from-yellow-400 via-orange-600 to-black">
      {/* Intro Screen */}
      {!started ? (
        <motion.div
          className="text-center max-w-xl relative p-10 rounded-xl"
          animate={{ backgroundColor: ["#000000", "#FF6600", "#000000"] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <h1 className="text-6xl font-extrabold mb-4">DROSERA NETWORK</h1>
          <h2 className="text-5xl font-bold mb-4">TRAPNET</h2>
          <p className="text-lg mb-2">BY BIG KAYY</p>
          <p className="mb-6">
            Welcome to the TrapNet Game 🎮. Test your knowledge on Drosera and crypto safety across 20 levels. Can you become a **Certified Trapper**?
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-orange-600 px-6 py-3 rounded-xl text-lg hover:bg-orange-500"
          >
            Start Game
          </button>
        </motion.div>
      ) : !discordEntered ? (
        <div className="text-center max-w-xl">
          <h2 className="text-2xl mb-4">Enter Your Discord Username</h2>
          <input
            type="text"
            placeholder="Discord Username"
            value={discordName}
            onChange={(e) => setDiscordName(e.target.value)}
            className="p-2 rounded-lg text-black w-full mb-4"
          />
          <button
            onClick={() => discordName.trim() && setDiscordEntered(true)}
            className="bg-green-600 px-6 py-3 rounded-xl text-lg hover:bg-green-500"
          >
            Continue
          </button>
        </div>
      ) : !finished ? (
        <div className="max-w-2xl w-full">
          {/* Progress Bar */}
          <div className="w-full h-4 bg-gray-300 rounded-full mb-6">
            <div
              className="h-4 rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Level Info */}
          <h2 className="text-2xl font-bold mb-2">
            Level {level + 1} of {levels.length}
          </h2>
          <p className="mb-2 text-lg">Discord: {discordName}</p>
          <p className="mb-4 text-lg">Time Left: {timer}s</p>
          <p className="mb-6 text-lg font-semibold">{current.question}</p>

          <div className="space-y-4">
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => checkAnswer(option)}
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
      ) : (
        <div className="text-center max-w-xl relative">
          {score === levels.length && <Confetti width={windowSize.width} height={windowSize.height} />}
          <h1 className="text-4xl font-bold mb-4">
            {score === levels.length ? "🎉 Perfect Score! 🎉" : "Game Over"}
          </h1>
          <p className="mb-4 text-xl">Your Score: {score}/{levels.length}</p>

          {score === levels.length ? (
            <button
              onClick={() => {
                setFinished(false);
                setLevel(0);
              }}
              className="bg-green-600 px-6 py-3 rounded-xl text-lg hover:bg-green-500 mb-4"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                setFinished(false);
                setLevel(0);
                setScore(0);
                setSelected(null);
                setTimer(10);
              }}
              className="bg-red-600 px-6 py-3 rounded-xl text-lg hover:bg-red-500 mb-4"
            >
              Replay Game
            </button>
          )}

          <TwitterShareButton
            url="https://drosera-game-j4j9.vercel.app/"
            title={`Hi! I scored ${score}/${levels.length} on the TrapNet Game by @kinigramm!`}
          >
            <button className="bg-blue-500 px-6 py-3 rounded-xl text-lg hover:bg-blue-400 mb-4">
              Share on Twitter
            </button>
          </TwitterShareButton>

          <a
            href="https://discord.gg/drosera"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#5865F2] text-white px-6 py-4 rounded-xl mt-6"
          >
            Join the Drosera Network Community on Discord 🚀
          </a>
        </div>
      )}
    </div>
  );
   }
