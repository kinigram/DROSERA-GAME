"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import { TwitterShareButton, TwitterIcon } from "react-share";

// ----------------- Sounds -----------------
const soundCorrect = new Howl({ src: ["/sounds/correct.mp3"], volume: 0.6 });
const soundWrong = new Howl({ src: ["/sounds/wrong.mp3"], volume: 0.6 });
const soundPass = new Howl({ src: ["/sounds/pass.mp3"], volume: 0.7 });
const soundFinish = new Howl({ src: ["/sounds/finish.mp3"], volume: 0.8 });

// ----------------- Confetti -----------------
function Confetti({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-40"
        >
          {Array.from({ length: 30 }).map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 0.6;
            const size = 6 + Math.random() * 12;
            const bg = ["#FF4D4F", "#FFD166", "#06D6A0", "#3A86FF", "#FF7BAC"][
              Math.floor(Math.random() * 5)
            ];
            return (
              <motion.div
                key={i}
                initial={{ y: -50, opacity: 0 }}
                animate={{
                  y: 700,
                  rotate: Math.random() * 360,
                  opacity: 1,
                }}
                transition={{ duration: 2.2, delay }}
                style={{ left: `${left}%` }}
                className="absolute"
              >
                <div
                  style={{
                    width: size,
                    height: size,
                    background: bg,
                    borderRadius: 4,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ----------------- Questions -----------------
const questions = [
  {
    question: "Who runs the Drosera client and responds to suspicious activity?",
    options: [
      "Network Operators",
      "Only Ethereum Foundation Developers",
      "Random MetaMask Users",
    ],
    answer: "Network Operators",
  },
  {
    question: "How does Drosera incentivize participants to react to threats?",
    options: ["Free NFTs", "Rewards for timely trap activation", "DAO Voting"],
    answer: "Rewards for timely trap activation",
  },
  {
    question: "Which projects are already collaborating with Drosera on testnet?",
    options: ["Ion Protocol, Etherfi, Gravita", "Binance, Coinbase, Kraken"],
    answer: "Ion Protocol, Etherfi, Gravita",
  },
  {
    question: "What is the role of traps in the Drosera system?",
    options: [
      "Detect suspicious activity and trigger emergency actions",
      "Generate new tokens for participants",
    ],
    answer: "Detect suspicious activity and trigger emergency actions",
  },
  {
    question: "What type of attack can Drosera help stop?",
    options: [
      "Front-running",
      "Smart contract rug pulls",
      "Wallet drains",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "What is the first step when a trap detects suspicious activity?",
    options: ["Pause protocol", "Mint new tokens", "Notify Coinbase"],
    answer: "Pause protocol",
  },
  {
    question: "Who decides when a trap gets triggered?",
    options: ["Community operators", "Binance", "Ethereum miners"],
    answer: "Community operators",
  },
  {
    question: "How many tries does a player get per level in Trap Net?",
    options: ["1", "2", "Unlimited"],
    answer: "2",
  },
  {
    question: "Drosera works as a security layer for what?",
    options: ["DeFi protocols", "Twitter", "YouTube"],
    answer: "DeFi protocols",
  },
  {
    question: "Which of these is a benefit of Drosera traps?",
    options: [
      "Early detection of suspicious transactions",
      "Earning yield from locked assets",
      "Printing free ETH",
    ],
    answer: "Early detection of suspicious transactions",
  },
  {
    question: "What happens after you correctly answer a level in Trap Net?",
    options: ["You unlock the next level", "You win ETH", "The game ends"],
    answer: "You unlock the next level",
  },
  {
    question: "Drosera rewards participants for…?",
    options: ["Sleeping", "Timely threat response", "DAO memes"],
    answer: "Timely threat response",
  },
  {
    question: "What does 'Trap Activation' mean?",
    options: [
      "Shutting down a protocol permanently",
      "Temporarily freezing to stop attacks",
    ],
    answer: "Temporarily freezing to stop attacks",
  },
  {
    question: "Drosera focuses on defending against what kind of threats?",
    options: ["On-chain threats", "Physical theft", "Password guessing"],
    answer: "On-chain threats",
  },
  {
    question: "Which of these is NOT part of Drosera?",
    options: ["Traps", "Operators", "Validators", "Spotify playlists"],
    answer: "Spotify playlists",
  },
  {
    question: "When traps activate, what is protected?",
    options: ["User funds and protocol safety", "Netflix accounts"],
    answer: "User funds and protocol safety",
  },
  {
    question: "Drosera combines incentives with…?",
    options: ["Security monitoring", "Gaming skins", "Trading bots"],
    answer: "Security monitoring",
  },
  {
    question: "What happens if suspicious activity is ignored?",
    options: [
      "Nothing happens",
      "Attack might succeed and funds can be drained",
      "Users get free airdrops",
    ],
    answer: "Attack might succeed and funds can be drained",
  },
  {
    question: "What is Drosera’s ultimate mission?",
    options: [
      "Secure DeFi from real-time threats",
      "Build the best meme coins",
      "Sell NFTs",
    ],
    answer: "Secure DeFi from real-time threats",
  },
  {
    question: "After completing all 20 levels in Trap Net, what do you become?",
    options: ["Certified Trapper", "Ethereum Developer", "Crypto Millionaire"],
    answer: "Certified Trapper",
  },
];

// ----------------- Main Game -----------------
export default function Page() {
  const [route, setRoute] = useState<"splash" | "enter" | "play" | "finish">(
    "splash"
  );
  const [name, setName] = useState("");
  const [level, setLevel] = useState(0);
  const [tries, setTries] = useState(2);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [confetti, setConfetti] = useState(false);

  function startGame() {
    if (!name.trim()) return alert("Enter your Discord name to continue.");
    setLevel(0);
    setTries(2);
    setRoute("play");
  }

  function submitAnswer(opt: string) {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);

    const q = questions[level];
    if (opt === q.answer) {
      soundCorrect.play();
      soundPass.play();
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2500);

      if (level === questions.length - 1) {
        soundFinish.play();
        setTimeout(() => setRoute("finish"), 600);
      } else {
        setTimeout(() => {
          setLevel((l) => l + 1);
          setSelected(null);
          setRevealed(false);
          setTries(2);
        }, 1200);
      }
    } else {
      soundWrong.play();
      const left = tries - 1;
      setTries(left);
      if (left <= 0) {
        setTimeout(() => {
          alert("Out of tries. Restarting level.");
          setSelected(null);
          setRevealed(false);
          setTries(2);
        }, 600);
      }
    }
  }

  const pageVariants = {
    hidden: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-[#fff8ef] to-white">
      <Confetti show={confetti} />
      <AnimatePresence mode="wait">
        {route === "splash" && (
          <motion.div
            key="splash"
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.35 }}
            className="min-h-screen flex flex-col items-center justify-center bg-[#ff7000] p-8"
          >
            <Image
              src="/logo.png"
              alt="Trap Net"
              width={300}
              height={300}
              className="mb-6"
            />
            <h1 className="text-6xl font-extrabold text-white tracking-tight">
              TRAP NET
            </h1>
            <p className="text-white/90 mt-3 mb-6 max-w-xl text-center">
              Become a Certified Trapper — protect protocols by learning to spot
              threats.
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Discord name"
              className="p-3 rounded-xl text-lg mb-4 w-64"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={startGame}
              className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-xl"
            >
              Start Game
            </motion.button>
          </motion.div>
        )}

        {route === "play" && (
          <motion.div
            key="play"
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.28 }}
            className="min-h-screen p-8 flex items-start"
          >
            <div className="max-w-3xl mx-auto w-full bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <Image src="/logo.png" alt="logo" width={80} height={80} />
                <div>
                  <div className="text-xl font-bold">
                    Level {level + 1} of {questions.length}
                  </div>
                  <div className="text-sm text-neutral-500">
                    Tries left: <span className="font-medium">{tries}</span>
                  </div>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 text-neutral-700 text-lg"
              >
                {questions[level].question}
              </motion.p>

              <div className="grid gap-3">
                {questions[level].options.map((opt) => {
                  const isSelected = selected === opt;
                  const isAnswer = revealed && opt === questions[level].answer;
                  const isWrong = revealed && isSelected && !isAnswer;
                  return (
                    <motion.button
                      whileHover={{ scale: revealed ? 1 : 1.02 }}
                      key={opt}
                      onClick={() => submitAnswer(opt)}
                      disabled={revealed}
                      className={`w-full text-left px-4 py-4 rounded-2xl border transition-all ${
                        isAnswer
                          ? "border-green-500 bg-green-50"
                          : isWrong
                          ? "border-red-500 bg-red-50"
                          : "bg-white border-neutral-200"
                      }`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {route === "finish" && (
          <motion.div
            key="finish"
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.28 }}
            className="min-h-screen flex items-center justify-center p-8"
          >
            <div className="max-w-2xl w-full text-center bg-white rounded-2xl p-8 shadow-2xl">
              <Image
                src="/logo.png"
                alt="logo"
                width={200}
                height={200}
                className="mx-auto mb-6"
              />
              <h2 className="text-3xl font-bold mb-4">
                YOU ARE NOW A CERTIFIED TRAPPER 🎖️
              </h2>
              <p className="mb-6">
                Congrats {name} — you’ve completed all levels and proven your
                instincts.
              </p>

              <div className="flex items-center justify-center gap-4 mb-6">
                <TwitterShareButton
                  title={`I just became a Certified Trapper on Trap Net by Drosera Network! 🛡️ Try it here:`}
                  url={typeof window !== "undefined" ? window.location.href : ""}
                >
                  <TwitterIcon size={48} round />
                </TwitterShareButton>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      typeof window !== "undefined" ? window.location.href : ""
                    );
                    alert("Link copied to clipboard");
                  }}
                  className="px-4 py-2 rounded-2xl border"
                >
                  Copy Link
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  setRoute("splash");
                  setLevel(0);
                  setTries(2);
                }}
                className="px-5 py-3 rounded-2xl border"
              >
                Play Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  }
