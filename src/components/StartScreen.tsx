import { Music2 } from "lucide-react";
import { motion } from "motion/react";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[70vh] px-4"
    >
      <motion.div 
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="bg-gradient-to-tr from-blue-500 to-purple-600 p-6 rounded-2xl mb-8 shadow-lg shadow-blue-500/20"
      >
        <Music2 className="w-16 h-16 text-white" />
      </motion.div>
      
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 text-center uppercase">
        SongGuesser
      </h1>
      
      <p className="text-gray-400 text-lg md:text-xl max-w-md text-center mb-12 font-medium">
        Test your pop culture knowledge. Listen to the 30-second preview and pick the correct title!
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl text-lg shadow-lg transition-colors w-full max-w-sm uppercase tracking-widest"
      >
        Start Game
      </motion.button>
    </motion.div>
  );
}
