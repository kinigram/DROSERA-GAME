"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [start, setStart] = useState(false);

  if (start) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <h1 className="text-3xl font-bold">Enter Discord Name</h1>
        <input
          type="text"
          placeholder="Your Discord name"
          className="px-4 py-2 text-black rounded-lg"
        />
        <button
          className="bg-red-600 px-6 py-2 rounded-2xl font-bold text-white"
          onClick={() => alert("Next: Levels screen coming soon!")}
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-500 gap-8">
      {/* Big logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <Image
          src="/logo.png"
          alt="Trap Net Logo"
          width={300}
          height={300}
          priority
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-5xl font-extrabold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        TRAP NET
      </motion.h1>

      {/* Start button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-red-600 text-white px-8 py-4 text-xl rounded-2xl shadow-lg"
        onClick={() => setStart(true)}
      >
        New Game
      </motion.button>
    </div>
  );
      }
