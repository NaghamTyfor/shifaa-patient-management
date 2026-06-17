import React from "react";
import { motion } from "motion/react";

export const HeartbeatBackground: React.FC = () => {
  const particles = [
    { id: 1, top: "15%", left: "10%", size: 6, duration: 8, delay: 0 },
    { id: 2, top: "25%", left: "85%", size: 10, duration: 12, delay: 1 },
    { id: 3, top: "45%", left: "15%", size: 8, duration: 10, delay: 3 },
    { id: 4, top: "65%", left: "90%", size: 12, duration: 14, delay: 2 },
    { id: 5, top: "80%", left: "20%", size: 7, duration: 9, delay: 4 },
    { id: 6, top: "85%", left: "75%", size: 9, duration: 11, delay: 5 },
    { id: 7, top: "40%", left: "50%", size: 5, duration: 7, delay: 1.5 },
    { id: 8, top: "70%", left: "45%", size: 8, duration: 13, delay: 3.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      
      
      <motion.div
        className="absolute top-10 right-[5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-teal-500/10 rounded-full filter blur-[80px] md:blur-[100px] lg:blur-[120px]"
        animate={{
          scale: [1, 1.2, 0.95, 1.1, 1],
          opacity: [0.7, 1, 0.75, 0.9, 0.7],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-10 left-[-10%] md:left-0 w-[280px] h-[280px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] bg-cyan-400/9 rounded-full filter blur-[80px] md:blur-[100px]"
        animate={{
          scale: [1, 1.3, 1.05, 1.15, 1],
          opacity: [0.6, 0.95, 0.65, 0.85, 0.6],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-[-100px] left-[10%] md:left-1/3 w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-[#10b981]/7 rounded-full filter blur-[70px] md:blur-[90px] hidden md:block"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <motion.div
        className="absolute bottom-[-100px] right-[5%] md:right-1/3 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-[#0284c7]/6 rounded-full filter blur-[90px] md:blur-[110px] hidden md:block"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.75, 0.4],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-multiply"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(13, 122, 128, 0.14) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(13, 122, 128, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: "clamp(24px, 4vw, 36px) clamp(24px, 4vw, 36px)",
        }}
      />

      <motion.div
        className="absolute top-0 bottom-0 w-[120px] md:w-[180px] bg-gradient-to-r from-transparent via-teal-500/8 to-transparent opacity-80 animate-pulse hidden md:block"
        animate={{
          left: ["-180px", "100%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="absolute top-1/4 right-[5%] md:right-[10%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-teal-500/40 bg-teal-500/[0.02]"
            initial={{ width: 0, height: 0, opacity: 0.9 }}
            animate={{
              width: ["0px", "160px", "200px"],
              height: ["0px", "160px", "200px"],
              opacity: [0.9, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-1/4 left-[5%] md:left-[8%] w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-cyan-400/35 bg-cyan-400/[0.015]"
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{
              width: ["0px", "120px", "150px"],
              height: ["0px", "120px", "150px"],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 1.6 + 0.5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-teal-400/30 border border-teal-300/50 shadow-[0_0_12px_rgba(20,184,166,0.4)] flex items-center justify-center"
          style={{
            top: p.top,
            left: p.left,
            width: `${Math.max(4, p.size - (window.innerWidth < 768 ? 2 : 0))}px`,
            height: `${Math.max(4, p.size - (window.innerWidth < 768 ? 2 : 0))}px`,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, 15, 0],
            scale: [1, 1.4, 0.9, 1.2, 1],
            opacity: [0.4, 0.9, 0.5, 0.8, 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {p.size > 8 && window.innerWidth >= 768 && (
            <div className="w-full h-full relative flex items-center justify-center opacity-70">
              <span className="block w-[60%] h-[1.5px] bg-teal-300 absolute animate-pulse" />
              <span className="block w-[1.5px] h-[60%] bg-teal-300 absolute animate-pulse" />
            </div>
          )}
        </motion.div>
      ))}

      
      <div className="hidden md:block">
        <svg
          className="absolute top-[15%] lg:top-[18%] left-0 w-full h-[140px] lg:h-[180px] text-teal-600/40 select-none"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 0,90 H 220 L 235,90 L 245,60 L 255,130 L 268,15 L 282,110 L 292,90 L 310,90 H 680 L 695,90 L 705,60 L 715,130 L 728,15 L 742,110 L 752,90 L 770,90 H 1120 L 1135,90 L 1145,60 L 1155,130 L 1168,15 L 1182,110 L 1192,90 L 1210,90 H 1440"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.15 }}
            animate={{
              pathLength: [0, 1, 1],
              opacity: [0.4, 0.9, 0.4],
              strokeDashoffset: [0, -300],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.circle
            cx="220"
            cy="90"
            r="5"
            className="fill-teal-400"
            style={{ filter: "drop-shadow(0px 0px 6px rgba(45, 212, 191, 1))" }}
            animate={{
              cx: [
                0, 220, 235, 245, 255, 268, 282, 292, 310, 
                680, 695, 705, 715, 728, 742, 752, 770,
                1120, 1135, 1145, 1155, 1168, 1182, 1192, 1210, 1440
              ],
              cy: [
                90, 90, 90, 60, 130, 15, 110, 90, 90,
                90, 90, 60, 130, 15, 110, 90, 90,
                90, 90, 60, 130, 15, 110, 90, 90, 90
              ],
              opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </div>

      <svg
        className="absolute top-[40%] md:top-[48%] left-0 w-full h-[70px] md:h-[100px] text-cyan-500/35 select-none"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M 0,50 Q 80,10 160,50 T 320,50 T 480,50 T 640,50 T 800,50 T 960,50 T 1120,50 T 1280,50 T 1440,50"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0.3, 0.75, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="0"
          cy="50"
          r="4"
          className="fill-cyan-300"
          style={{ filter: "drop-shadow(0px 0px 6px rgba(34, 211, 238, 0.95))" }}
          animate={{
            cx: ["0%", "100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>

      <div className="hidden md:block">
        <svg
          className="absolute bottom-[10%] lg:bottom-[12%] left-0 w-full h-[100px] lg:h-[120px] text-emerald-500/35 select-none"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 0,60 L 150,60 L 165,60 L 172,40 L 180,90 L 190,10 L 200,75 L 206,60 L 220,60 L 650,60 L 665,60 L 672,40 L 680,90 L 690,10 L 700,75 L 706,60 L 720,60 L 1150,60 L 1165,60 L 1172,40 L 1180,90 L 1190,10 L 1200,75 L 1206,60 L 1220,60 L 1440,60"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.15 }}
            animate={{
              pathLength: [0, 1, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
              delay: 2.5,
            }}
          />
          <motion.circle
            cx="150"
            cy="60"
            r="4"
            className="fill-emerald-400"
            style={{ filter: "drop-shadow(0px 0px 6px rgba(52, 211, 153, 0.9))" }}
            animate={{
              cx: [
                0, 150, 165, 172, 180, 190, 200, 206, 220,
                650, 665, 672, 680, 690, 700, 706, 720,
                1150, 1165, 1172, 1180, 1190, 1200, 1206, 1220, 1440
              ],
              cy: [
                60, 60, 60, 40, 90, 10, 75, 60, 60,
                60, 60, 40, 90, 10, 75, 60, 60,
                60, 60, 40, 90, 10, 75, 60, 60, 60
              ],
              opacity: [0, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
              delay: 2.5,
            }}
          />
        </svg>
      </div>

    </div>
  );
};