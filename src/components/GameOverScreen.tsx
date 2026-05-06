import { Trophy, RefreshCw, Star, Disc3, Mic2, Guitar, Flame, Radio, Headphones, Piano, Sparkles, Globe2 } from "lucide-react";
import { motion } from "motion/react";
import { GameMode } from "../types";
import React from "react";

interface GameOverScreenProps {
  score: number;
  totalQuestions: number;
  mode: GameMode;
  onRestart: () => void;
}

const genreConfigs: Record<GameMode, { bg: string, icon: React.ElementType, colors: string, effect: string, title: string, subtitle: string }> = {
  pop: { bg: "bg-pink-900/30", icon: Star, colors: "from-pink-500 to-rose-500 text-pink-500", effect: "shadow-pink-500/50", title: "Pop Star", subtitle: "Chart-Topping Score!" },
  kpop: { bg: "bg-fuchsia-900/30", icon: Sparkles, colors: "from-fuchsia-500 to-purple-500 text-fuchsia-400", effect: "shadow-fuchsia-500/50", title: "Idol Material", subtitle: "Daebak Performance!" },
  rock: { bg: "bg-red-900/30", icon: Guitar, colors: "from-red-600 to-orange-600 text-red-500", effect: "shadow-red-600/50", title: "Rock Legend", subtitle: "You Shredded That!" },
  hiphop: { bg: "bg-amber-900/30", icon: Mic2, colors: "from-amber-500 to-yellow-500 text-amber-500", effect: "shadow-amber-500/50", title: "Rap God", subtitle: "Fire Bars & Beats!" },
  edm: { bg: "bg-cyan-900/30", icon: Disc3, colors: "from-cyan-400 to-blue-500 text-cyan-400", effect: "shadow-cyan-400/50", title: "Mainstage Headliner", subtitle: "The Drop Was Epic!" },
  jazz: { bg: "bg-blue-900/30", icon: Radio, colors: "from-blue-600 to-indigo-600 text-blue-500", effect: "shadow-blue-600/50", title: "Cool Cat", subtitle: "Smooth & Sophisticated." },
  country: { bg: "bg-orange-900/30", icon: Guitar, colors: "from-orange-400 to-amber-600 text-orange-400", effect: "shadow-orange-400/50", title: "Nashville Star", subtitle: "Yee-Haw! Great Job!" },
  rnb: { bg: "bg-violet-900/30", icon: Flame, colors: "from-violet-500 to-purple-600 text-violet-400", effect: "shadow-violet-500/50", title: "R&B Icon", subtitle: "Soulful & Smooth." },
  reggae: { bg: "bg-emerald-900/30", icon: Globe2, colors: "from-emerald-500 to-green-600 text-emerald-400", effect: "shadow-emerald-500/50", title: "Island Legend", subtitle: "Good Vibes Only." },
  folk: { bg: "bg-stone-800/40", icon: Headphones, colors: "from-stone-500 to-slate-600 text-stone-400", effect: "shadow-stone-500/50", title: "Indie Darling", subtitle: "Acoustic Perfection." },
  classical: { bg: "bg-slate-800/40", icon: Piano, colors: "from-slate-300 to-gray-500 text-slate-300", effect: "shadow-slate-300/50", title: "Maestro", subtitle: "A Masterpiece Performance." },
};

export function GameOverScreen({ score, totalQuestions, mode, onRestart }: GameOverScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const config = genreConfigs[mode] || genreConfigs.pop;
  const Icon = config.icon || Trophy;
  
  let message = config.subtitle;
  if (percentage === 100) message = "Flawless Perfect Score! " + message;
  else if (percentage >= 80) message = "Amazing! " + message;
  else if (percentage >= 50) message = "Not bad! Next time grab the #1 spot.";
  else message = "Keep practicing! Every legend starts somewhere.";

  // Array to create floating particle background effect
  const particles = Array.from({ length: 20 });

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-[75vh] px-4 overflow-hidden rounded-[40px] ${config.bg} border-t border-white/10 shadow-[inset_0_4px_30px_rgba(255,255,255,0.05)]`}>
      {/* 5D Particle Effect Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
               opacity: 0, 
               y: Math.random() * 500 - 250, 
               x: Math.random() * 500 - 250, 
               scale: Math.random() * 0.5 + 0.5 
            }}
            animate={{ 
               opacity: [0, 0.4, 0],
               y: Math.random() * -500 - 100,
               x: Math.random() * 300 - 150,
               scale: [0, Math.random() * 2 + 1, 0] 
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            className={`absolute top-3/4 left-1/2 w-4 h-4 rounded-full bg-gradient-to-t ${config.colors.split(' ')[0]} to-transparent blur-md`}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.5, rotateY: 90, z: -200 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        className="relative z-10 flex flex-col items-center"
        style={{ perspective: 1000 }}
      >
        <motion.div 
          animate={{ 
            rotateX: [0, 10, -10, 0],
            rotateY: [0, -10, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tr ${config.colors} bg-opacity-20 backdrop-blur-2xl p-6 rounded-[2rem] md:rounded-[3rem] mb-6 shadow-[0_0_80px_rgba(0,0,0,0.5)] ${config.effect} border border-white/20 preserve-3d`}
        >
           {/* Inner glowing element */}
           <div className="absolute inset-0 bg-white/20 rounded-inherit opacity-0 animate-pulse pointer-events-none" />
           <Icon className="w-20 h-20 md:w-24 md:h-24 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] filter" style={{ transform: "translateZ(30px)" }} />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="text-center"
        >
          <div className={`text-sm md:text-base font-bold uppercase tracking-[0.3em] ${config.colors.split(' ').pop()} mb-2 drop-shadow-md`}>
            {config.title}
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            Game Over
          </h2>
          <p className="text-gray-300 font-medium text-lg md:text-xl mb-10 max-w-sm drop-shadow-lg">
            {message}
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.5, type: "spring" }}
           className="relative group w-full max-w-sm mb-12"
        >
          {/* Hexagonal / Brutalist Glass Box */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent blur-xl group-hover:blur-2xl transition-all duration-500 rounded-[2rem]"></div>
          <div className={`relative bg-neutral-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 text-center shadow-2xl transition-transform duration-500 hover:scale-[1.02] transform-gpu`}>
            <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent`}></div>
            <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-[0.25em] mb-3">Final Score</div>
            
            <div className={`text-7xl font-mono font-black ${config.colors.split(' ').pop()} flex items-baseline justify-center gap-3 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]`}>
              <motion.span 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8, type: "spring", bounce: 0.8 }}
              >
                {score}
              </motion.span>
              <span className="text-4xl text-gray-600 font-medium tracking-tighter">/</span>
              <span className="text-5xl text-gray-500 font-medium">{totalQuestions}</span>
            </div>
            
            {/* Progress Bar Visualization */}
            <div className="mt-8 h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                className={`absolute top-0 left-0 bottom-0 bg-gradient-to-r ${config.colors} rounded-full`}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className={`relative z-10 flex items-center justify-center gap-3 px-10 py-5 bg-white text-black hover:bg-gray-100 font-black rounded-full text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all w-full max-w-sm uppercase tracking-widest`}
      >
        <RefreshCw className="w-5 h-5 flex-shrink-0" />
        Play Again
      </motion.button>
    </div>
  );
}
