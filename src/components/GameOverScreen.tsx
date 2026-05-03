import { Trophy, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

interface GameOverScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function GameOverScreen({ score, totalQuestions, onRestart }: GameOverScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "Good effort!";
  if (percentage === 100) message = "Perfect Score! You're a music legend!";
  else if (percentage >= 80) message = "Amazing! You know your tunes!";
  else if (percentage >= 50) message = "Not bad! But you can do better!";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="flex flex-col items-center justify-center min-h-[70vh] px-4"
    >
      <motion.div 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", bounce: 0.6 }}
        className="bg-gradient-to-tr from-blue-500 to-purple-600 p-6 rounded-2xl mb-6 shadow-lg shadow-blue-500/20"
      >
        <Trophy className="w-16 h-16 text-white" />
      </motion.div>

      <h2 className="text-4xl font-bold uppercase tracking-tight text-white mb-2 text-center">Game Over</h2>
      <p className="text-gray-400 text-lg mb-8 text-center">{message}</p>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 mb-10 w-full max-w-sm text-center shadow-2xl relative">
        <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-2">Final Score</div>
        <div className="text-6xl font-mono font-bold text-blue-400 flex items-baseline justify-center gap-2">
          {score}
          <span className="text-3xl text-gray-500 font-medium">/ {totalQuestions}</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl text-lg shadow-lg transition-colors w-full max-w-sm uppercase tracking-widest"
      >
        <RefreshCw className="w-5 h-5" />
        Play Again
      </motion.button>
    </motion.div>
  );
}
