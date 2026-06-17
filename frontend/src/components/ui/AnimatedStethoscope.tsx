import React from "react";
import { motion } from "motion/react";

interface AnimatedStethoscopeProps {
  className?: string;
  size?: number; 
}

export const AnimatedStethoscope: React.FC<AnimatedStethoscopeProps> = ({
  className = "",
  size = 48,
}) => {
  return (
    <motion.div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.05, rotate: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(13,122,128,0.15)]"
      >
        <defs>
          <linearGradient id="stethoscopeBinaural" x1="0" y1="0" x2="100" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="glowingTeal" x1="0" y1="0" x2="0" y2="100">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0d7a80" />
          </linearGradient>
        </defs>

        <motion.path
          d="M 25,25 Q 35,15 45,25"
          stroke="url(#stethoscopeBinaural)"
          strokeWidth="4.5"
          strokeLinecap="round"
          animate={{
            d: ["M 25,25 Q 35,15 45,25", "M 24,25 Q 35,14 46,25", "M 25,25 Q 35,15 45,25"],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        />
        <circle cx="25" cy="25" r="3.5" fill="#1e293b" />
        <circle cx="45" cy="25" r="3.5" fill="#1e293b" />

        <motion.path
          d="M 25,25 V 40 C 25,55 45,55 45,40 V 25"
          stroke="url(#stethoscopeBinaural)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            y: [0, -1, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        />

        <motion.path
          d="M 35,48 C 35,68 15,65 15,80 C 15,95 40,95 50,85 C 60,75 62,60 70,60"
          stroke="url(#glowingTeal)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            pathLength: [0.98, 1, 0.98],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />

        <circle
          cx="70"
          cy="60"
          r="16"
          fill="#ffffff"
          stroke="#1e293b"
          strokeWidth="4"
          className="filter drop-shadow-sm"
        />
        
        <circle
          cx="70"
          cy="60"
          r="11"
          fill="#f0fdfa"
        />

        <motion.path
          d="M 70,66 C 68,66 63,61.5 63,57 C 63,54.5 65.5,52 68,52 C 69.5,52 70,53 70,53 C 70,53 70.5,52 72,52 C 74.5,52 77,54.5 77,57 C 77,61.5 72,66 70,66 Z"
          fill="url(#glowingTeal)"
          animate={{
            scale: [1, 1.18, 1],
            y: [0, -0.5, 0],
          }}
          style={{ originX: "70px", originY: "59px" }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      </svg>
      <span className="absolute bottom-1 left-7 w-3 h-3 bg-teal-400/30 rounded-full blur-md animate-ping pointer-events-none" />
    </motion.div>
  );
};
