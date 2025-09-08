"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Howl } from "howler";
import { TwitterShareButton } from "react-share";

// ----------------- Sounds -----------------
const correctSound = new Howl({ src: ["/sounds/correct.mp3"] });
const wrongSound = new Howl({ src: ["/sounds/wrong.mp3"] });

// ----------------- Questions -----------------
const questions = [
  {
    question: "Who Runs The Drosera Client and Responds to Suspicious Activity?",
    options: ["Network Operators", "Only Ethereum Foundation Developers", "Random MetaMask Users"],
    answer: "Network Operators",
  },
  {
    question: "How Does Drosera Incentivize Participants to React to Threats?",
    options: ["Free NFTs", "Rewards for Timely Trap Activation", "DAO Voting"],
    answer: "Rewards for Timely Trap Activation",
  },
  {
    question: "Which Projects Already Collaborate with Drosera on Testnet?",
    options: ["Ion Protocol, Etherfi, Gravita", "Binance, Coinbase, Kraken"],
    answer: "Ion Protocol, Etherfi, Gravita",
  },
  {
    question: "What is the Role of Traps in the Drosera System?",
    options: [
      "Detect Suspicious Activity and Trigger Emergency Actions",
      "Generate New Tokens for Participants",
    ],
    answer: "Detect Suspicious Activity and Trigger Emergency Actions",
  },
  {
    question: "What Happens if Suspicious Activity is Detected?",
    options: ["Traps Trigger Protective Actions", "Funds are Burned Instantly", "Nothing Happens"],
    answer: "Traps Trigger Protective Actions",
  },
  {
    question: "Drosera Helps Prevent Losses From?",
    options: ["Smart Contract Exploits", "Slow Transactions", "Gas Fee Spikes"],
    answer: "Smart Contract Exploits",
  },
  {
    question: "Who Benefits Most From Drosera Protection?",
    options: ["DeFi Protocols & Their Users", "Only Centralized Exchanges", "Casual Gamers"],
    answer: "DeFi Protocols & Their Users",
  },
  {
    question: "What Do Operators Gain for Running Drosera Clients?",
    options: ["Rewards & Incentives", "Free Merch", "Voting Power Only"],
    answer: "Rewards & Incentives",
  },
  {
    question: "What Is a Key Goal of Drosera?",
    options: ["Proactive Defense in Web3", "Issuing New Tokens", "Centralizing Ethereum"],
    answer: "Proactive Defense in Web3",
  },
  {
    question: "Drosera Reacts to Threats Using?",
    options: ["Automated Traps", "Manual Reports", "Off-chain Bots Only"],
    answer: "Automated Traps",
  },
  {
    question: "What Does Drosera Aim to Build for Web3?",
    options: ["A Safety Net for Protocols", "A New Meme Coin", "A Centralized Blockchain"],
    answer: "A Safety Net for Protocols",
  },
  {
    question: "How Are Drosera Traps Triggered?",
    options: ["By Suspicious Activity", "At Random Intervals", "By User Subscriptions"],
    answer: "By Suspicious Activity",
  },
  {
    question: "Drosera Is Best Described As?",
    options: ["A Decentralized Defense Layer", "A Crypto Wallet", "An NFT Marketplace"],
    answer: "A Decentralized Defense Layer",
  },
  {
    question: "Who Can Participate in Drosera’s Network?",
    options: ["Community Operators", "Only Government Agencies", "Only Vitalik Buterin"],
    answer: "Community Operators",
  },
  {
    question: "What Does Drosera Prevent Before It Happens?",
    options: ["On-chain Attacks", "Market Crashes", "Network Upgrades"],
    answer: "On-chain Attacks",
  },
  {
    question: "Drosera’s System Is Built for?",
    options: ["DeFi Security", "Gaming Rewards", "Advertising"],
    answer: "DeFi Security",
  },
  {
    question: "What is the Reward for Timely Trap Activation?",
    options: ["Incentives for Operators", "Airdropped NFTs", "Discord Roles Only"],
    answer: "Incentives for Operators",
  },
  {
    question: "Drosera Strengthens Web3 by?",
    options: ["Adding a Safety Layer", "Replacing Ethereum", "Mining More Coins"],
    answer: "Adding a Safety Layer",
  },
  {
    question: "What Is One Word to Describe Drosera?",
    options: ["Proactive", "Centralized", "Passive"],
    answer: "Proactive",
  },
  {
    question: "What Happens When You Complete This Game?",
    options: [
      "You Become a Certified Trapper",
      "You Get Free ETH",
      "You Unlock Binance VIP",
    ],
    answer: "You Become a Certified Trapper",
  },
];

export default function Game() {
  const [step, setStep] = useState<"intro" | "name" | "levels" | "finish">("intro");
  const [discordName, setDiscordName] = useState("");
  const [level, setLevel] = useState(0);
  const [tries, setTries] = useState(2);
  const [message, setMessage] = useState("");

  const handleAnswer = (option: string) => {
    if (option === questions[level].answer) {
      correctSound.play();
      setMessage("👏 Correct!");
      setTimeout(() => {
        if (level + 1 < questions.length) {
          setLevel(level + 1);
          setTries(2);
          setMessage("");
        } else {
          setStep("finish");
        }
      }, 1000);
    } else {
      wrongSound.play();
      if (tries > 1) {
        setTries(tries - 1);
        setMessage("❌ Wrong! Try again.");
      } else {
        setMessage("❌ Out of tries! Restarting this level.");
        setTimeout(() => {
          setTries(2);
          setMessage("");
        }, 1500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-500 text-white p-6">
      {/* Intro Screen */}
      {step === "intro" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Image src="/Drosera.jpg" alt="TrapNet Logo" width={200} height={200} />
          <h1 className="text-5xl font-bold mt-4">TRAPNET</h1>
          <p className="text-lg mt-2">BY BIG KAYY</p>
          <button
            className="mt-6 bg-red-600 px-6 py-3 rounded-xl font-bold"
            onClick={() => setStep("name")}
          >
            New Game
          </button>
        </motion.div>
      )}

      {/* Name Input */}
      {step === "name" && (
        <motion.div initial={{ x: -200 }} animate={{ x: 0 }} className="text-center">
          <h2 className="text-2xl mb-4">Enter Discord Name</h2>
          <input
            type="text"
            placeholder="Your Discord Name"
            value={discordName}
            onChange={(e) => setDiscordName(e.target.value)}
            className="p-2 rounded-lg text-black bg-yellow-300"
          />
          <br />
          <button
            onClick={() => setStep("levels")}
            className="mt-4 bg-green-600 px-6 py-2 rounded-xl"
          >
            Continue
          </button>
        </motion.div>
      )}

      {/* Levels */}
      {step === "levels" && (
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-2xl text-center">
          <Image src="/Drosera.jpg" alt="TrapNet Logo" width={120} height={120} />
          <h2 className="text-2xl font-bold mb-4">
            Level {level + 1} of {questions.length}
          </h2>
          <p className="mb-4">Tries left: {tries}</p>
          <div className="p-4 bg-purple-700 border-4 border-black rounded-2xl mb-4">
            <p className="text-lg">{questions[level].question}</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {questions[level].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="bg-purple-600 border-2 border-black p-3 rounded-xl hover:bg-purple-800"
              >
                {opt}
              </button>
            ))}
          </div>
          {message && <p className="mt-4 text-xl">{message}</p>}
        </motion.div>
      )}

      {/* Finish Screen */}
      {step === "finish" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h2 className="text-3xl font-bold mb-4">🎉 YOU ARE NOW A CERTIFIED TRAPPER 🎉</h2>
          <TwitterShareButton
            url="https://drosera-game-j4j9.vercel.app/"
            title="Hi I just completed the Trap Net Game by @kinigramm and I'm now a Certified Trapper 😎 Join and play too!"
          >
            <button className="bg-blue-500 px-6 py-3 rounded-xl font-bold text-white">
              Share on Twitter
            </button>
          </TwitterShareButton>
          <p className="mt-2">BY BIG KAYY</p>
        </motion.div>
      )}
    </div>
  );
    }
