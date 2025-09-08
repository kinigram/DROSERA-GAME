"use client";

import { useState, useEffect } from "react";
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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const current = levels[level];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const checkAnswer = (option: string) => {
    setSelected(option);
    if (option === current.answer) {
      correctSound.play();
      if (level + 1 < levels.length) {
        setTimeout(() => {
          setLevel(level + 1);
          setSelected(null);
        }, 1000);
      } else {
        setFinished(true);
        winSound.play();
      }
    } else {
      wrongSound.play();
      setTimeout(() => setSelected(null), 800);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      {!started ? (
        <motion.div
          className="text-center max-w-xl relative"
          animate={{ backgroundColor: ["#000000", "#FF6600", "#000000"] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ padding: "40px", borderRadius: "20px" }}
        >
          <h1 className="text-5xl font-bold mb-4">TRAPNET</h1>
          <p className="text-lg mb-2">BY BIG KAYY</p>
          <p className="mb-6">
            Welcome to the TrapNet Game 🎮.  
            Test your knowledge on Drosera and crypto safety across 20 levels.  
            Can you become a **Certified Trapper**?
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-orange-600 px-6 py-3 rounded-xl text-lg hover:bg-orange-500"
          >
            Start Game
          </button>
        </motion.div>
      ) : !finished ? (
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-6">
            Level {level + 1} of {levels.length}
          </h2>
          <p className="mb-6 text-lg">{current.question}</p>
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
          <Confetti width={windowSize.width} height={windowSize.height} />
          <h1 className="text-4xl font-bold mb-4">🎉 Congratulations! 🎉</h1>
          <p className="mb-4">
            You’ve completed all 20 levels and are now a **Certified Trapper 😎**.
          </p>
          <TwitterShareButton
            url="https://drosera-game-j4j9.vercel.app/"
            title="Hi I just completed the Trap Net Game by @kinigramm and I'm now a Certified Trapper 😎 join and play too 👉"
          >
            <button className="bg-blue-500 px-6 py-3 rounded-xl text-lg hover:bg-blue-400 mb-4">
              Share on Twitter
            </button>
          </TwitterShareButton>
          <div
            className="bg-[#5865F2] text-white px-6 py-4 rounded-xl mt-6"
            style={{ display: "inline-block" }}
          >
            Join the TrapNet community on Discord 🚀
          </div>
        </div>
      )}
    </div>
  );
    }
