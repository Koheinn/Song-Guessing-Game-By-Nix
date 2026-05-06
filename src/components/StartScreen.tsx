import { Music2, Globe2, Mic2, Star, Guitar, Disc3, Headphones, Radio, Piano, Sparkles, Flame } from "lucide-react";
import { motion } from "motion/react";
import { GameMode } from "../types";

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const modes: { id: GameMode; title: string; icon: React.ElementType; description: string; color: string }[] = [
    { id: 'pop', title: 'Pop', icon: Star, description: 'Top 40 & Global Hits', color: 'from-pink-500 to-rose-500 text-pink-500' },
    { id: 'kpop', title: 'K-Pop', icon: Sparkles, description: 'Trending Korean Idols', color: 'from-fuchsia-500 to-purple-500 text-fuchsia-400' },
    { id: 'rock', title: 'Rock', icon: Guitar, description: 'Classic & Modern Rock', color: 'from-red-600 to-orange-600 text-red-500' },
    { id: 'hiphop', title: 'Hip Hop', icon: Mic2, description: 'Rap & Urban Beats', color: 'from-amber-500 to-yellow-500 text-amber-500' },
    { id: 'edm', title: 'EDM', icon: Disc3, description: 'Electronic Dance Music', color: 'from-cyan-400 to-blue-500 text-cyan-400' },
    { id: 'jazz', title: 'Jazz', icon: Radio, description: 'Smooth & Classic Jazz', color: 'from-blue-600 to-indigo-600 text-blue-500' },
    { id: 'country', title: 'Country', icon: Guitar, description: 'Nashville & Beyond', color: 'from-orange-400 to-amber-600 text-orange-400' },
    { id: 'rnb', title: 'R&B', icon: Flame, description: 'Rhythm & Blues', color: 'from-violet-500 to-purple-600 text-violet-400' },
    { id: 'reggae', title: 'Reggae', icon: Globe2, description: 'Island Grooves', color: 'from-emerald-500 to-green-600 text-emerald-400' },
    { id: 'folk', title: 'Folk', icon: Headphones, description: 'Acoustic & Indie Folk', color: 'from-stone-500 to-slate-600 text-stone-400' },
    { id: 'classical', title: 'Classical', icon: Piano, description: 'Symphonies & Sonatas', color: 'from-slate-300 to-gray-500 text-slate-300' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
    >
      <motion.div 
        initial={{ rotate: -10 }}
        animate={{ rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="bg-neutral-900 border border-white/10 p-5 rounded-2xl mb-6 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-600/20 mix-blend-overlay"></div>
        <Music2 className="w-12 h-12 text-white relative z-10" />
      </motion.div>
      
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-3 text-center uppercase">
        SongGuesser
      </h1>
      
      <p className="text-gray-400 text-base md:text-lg max-w-md text-center mb-10 font-medium">
        Select a game mode. Listen to the 30-second preview and pick the correct track!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        {modes.map((mode, index) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart(mode.id)}
            className="group relative flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 focus:outline-none border border-white/10 hover:border-white/20 rounded-[24px] transition-colors text-center overflow-hidden"
          >
            {/* Hover glow */}
            <div className={`absolute inset-0 bg-gradient-to-b ${mode.color.split(' ')[0]} to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            <div className="bg-neutral-900 p-4 rounded-xl mb-4 border border-white/5 group-hover:border-white/10 transition-colors z-10">
              <mode.icon className={`w-8 h-8 ${mode.color.split(' ').pop()}`} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide z-10">{mode.title}</h3>
            <p className="text-sm text-gray-400 font-medium z-10">{mode.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
