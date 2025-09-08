"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import { TwitterShareButton } from "react-share";
import Confetti from "react-confetti";

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
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [discordName, setDiscordName] = useState("");
  const [discordEntered, setDiscordEntered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [confetti, setConfetti] = useState(false);
  const [finalConfetti, setFinalConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState<{ x: number; y: number } | null>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = levels[level];

  // Timer logic
  useEffect(() => {
    if (!started || !discordEntered || finished) return;
    setTimeLeft(10);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [level, started, discordEntered, finished]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const startGame = () => setStarted(true);
  const handleDiscordSubmit = () => { if (discordName.trim() !== "") setDiscordEntered(true); };

  const handleTimeout = () => {
    wrongSound.play();
    nextLevel();
  };

  const nextLevel = () => {
    if (level + 1 < levels.length) setLevel(level + 1);
    else setFinished(true);
    setSelected(null);
  };

  const checkAnswer = (option: string, index: number) => {
    setSelected(option);
    if (option === current.answer) {
      correctSound.play();
      setScore(score + 1);

      if (optionRefs.current[index]) {
        const rect = optionRefs.current[index]!.getBoundingClientRect();
        setConfettiPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        setConfetti(true);
        setTimeout(() => setConfetti(false), 1500);
      }
      nextLevel();
    } else {
      wrongSound.play();
      nextLevel();
    }
  };

  const replayGame = () => {
    setLevel(0); setScore(0); setFinished(false); setSelected(null); setDiscordEntered(false); setDiscordName(""); setStarted(false);
  };

  const progressPercent = ((level + 1) / levels.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 animate-gradientGlow bg-gradient-to-r from-yellow-400 via-orange-600 to-black">
      {started && discordEntered && !finished && (
        <div className="w-full max-w-2xl h-4 bg-gray-300 rounded-full mt-4 mb-6">
          <div className="h-4 rounded-full bg-green-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      )}

      {confetti && confettiPosition && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={100} recycle={false} confettiSource={{ x: confettiPosition.x, y: confettiPosition.y, w: 0, h: 0 }} />}
      {finalConfetti && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={500} />}

      {!started ? (
        <motion.div className="text-center max-w-xl p-10 rounded-3xl" animate={{ backgroundColor: ["#000000", "#FF6600", "#FFFF00", "#000000"] }} transition={{ duration: 4, repeat: Infinity }}>
          <h1 className="text-6xl font-extrabold mb-2 text-white">DROSERA NETWORK</h1>
          <h2 className="text-5xl font-bold mb-4 text-white">TRAPNET</h2>
          <p className="text-lg mb-6 text-white">BY BIG KAYY</p>
          <p className="mb-6 text-white">Welcome to the TrapNet Game 🎮. Test your knowledge on Drosera and crypto safety across 20 levels. Can you become a <strong>Certified Trapper 😎</strong>?</p>
          <div className="flex flex-col gap-4">
            <button onClick={startGame} className="bg-orange-600 px-6 py-3 rounded-xl text-lg hover:bg-orange-500">Start Game</button>
            <a href="https://discord.gg/drosera" target="_blank" rel="noopener noreferrer" className="bg-[#5865F2] px-6 py-3 rounded-xl text-lg text-white hover:bg-blue-500">Join the Drosera Discord Community</a>
          </div>
        </motion.div>
      ) : !discordEntered ? (
        <div className="max-w-xl w-full text-center mt-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Enter Your Discord Name</h2>
          <input type="text" value={discordName} onChange={(e) => setDiscordName(e.target.value)} className="w-full p-3 rounded-xl mb-4 text-black" placeholder="Discord Username" />
          <button onClick={handleDiscordSubmit} className="bg-green-500 px-6 py-3 rounded-xl text-lg hover:bg-green-400">Continue</button>
        </div>
      ) : !finished ? (
        <div className="max-w-2xl w-full text-center">
          {discordName && <button className="mb-4 bg-yellow-400 px-4 py-2 rounded-xl text-black font-bold">{discordName}</button>}
          <h2 className="text-2xl font-bold mb-2 text-white">Level {level + 1} of {levels.length}</h2>
          <p className="mb-2 text-lg text-white">Time Left: {timeLeft}s</p>
          <p className="mb-6 text-lg text-white">{current.question}</p>
          <div className="space-y-4">
            {current.options.map((option, index) => (
              <button key={option} ref={(el) => (optionRefs.current[index] = el)} onClick={() => checkAnswer(option, index)}
                className={`w-full p-4 rounded-xl border-2 transition ${selected === option ? option === current.answer ? "bg-green-600 border-black" : "bg-red-600 border-black" : "bg-orange-500 hover:bg-orange-400 border-black"}`}>
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center max-w-xl mt-8">
          <Confetti width={windowSize.width} height={windowSize.height
            {finalConfetti && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={500} />}

          <h1 className="text-5xl font-bold mb-4 text-white">🎉 Game Over 🎉</h1>
          <p className="text-2xl mb-6 text-white">
            Your Score: {score}/{levels.length}
          </p>

          {score === levels.length ? (
            <>
              <p className="text-xl mb-6 text-white">Perfect! You are now a Certified Trapper 😎</p>
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
              <p className="text-xl mb-6 text-white">You didn’t complete all levels. Try again to get 20/20!</p>
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
