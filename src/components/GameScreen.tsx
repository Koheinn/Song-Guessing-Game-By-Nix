import { useState, useEffect } from "react";
import { QuestionType, Song } from "../types";
import { AudioPlayer } from "./AudioPlayer";
import { motion } from "motion/react";
import { useSoundEffects } from "../hooks/useSoundEffects";

interface GameScreenProps {
  question: QuestionType;
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  onAnswer: (isCorrect: boolean) => void;
  onEndGame: () => void;
}

export function GameScreen({
  question,
  currentQuestionIndex,
  totalQuestions,
  score,
  onAnswer,
  onEndGame,
}: GameScreenProps) {

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playCorrect, playWrong } = useSoundEffects();

  // Reset state when question changes
  useEffect(() => {
    setSelectedOptionId(null);
    setIsRevealed(false);
    setIsTransitioning(false);
  }, [question]);

  const handleOptionClick = (option: Song) => {
    if (isRevealed) return; // Prevent clicking after selection

    setSelectedOptionId(option.id);
    setIsRevealed(true);

    const isCorrect = option.id === question.correctSong.id;
    if (isCorrect) {
      playCorrect();
    } else {
      playWrong();
    }
    
    // Wait before advancing
    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        onAnswer(isCorrect);
      }, 100);
    }, 2400);
  };

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Top Navigation / Stats Bar */}
      <nav className="relative z-10 flex justify-between items-center mb-8 sm:mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight uppercase hidden sm:block">SongGuesser</span>
          
          <button 
            onClick={onEndGame}
            className="ml-4 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-red-400 bg-red-400/10 hover:bg-red-400/20 border border-red-400/20 rounded-lg transition-colors"
          >
            End Game
          </button>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Current Score</p>
            <p className="text-2xl font-mono font-bold text-blue-400">{score}</p>
          </div>
          <div className="h-8 w-px bg-white/10"></div>
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Question</p>
            <p className="text-2xl font-mono font-bold">
              {String(currentQuestionIndex + 1).padStart(2, '0')} <span className="text-sm text-gray-500">/ {totalQuestions}</span>
            </p>
          </div>
        </div>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col items-center justify-center pb-8 lg:pb-12 px-4 sm:px-0"
      >
        
        {/* Album/Visualizer Glass Card */}
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 mb-10 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10">
            {/* Album Art Reveal Area */}
            <div className="relative flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 perspective-1000">
              <div className={`w-full h-full transition-all duration-700 preserve-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
                
                {/* Front of card (Vinyl Placeholder) */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-black rounded-full flex flex-col items-center justify-center border-4 border-white/10 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                  {/* Decorative glowing orb */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] mix-blend-screen" />
                  
                  {/* Music Icon */}
                  <svg className="w-16 h-16 text-white/50 z-10 drop-shadow-2xl" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  
                  <div className="mt-4 z-10 text-xs font-mono tracking-widest text-white/40 uppercase">Guess the track</div>

                  {/* Subtle rings */}
                  <div className="absolute inset-4 rounded-full border border-white/5" />
                  <div className="absolute inset-10 rounded-full border border-white/5" />
                  
                  {/* Spinning effect inside */}
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,255,255,0.1)_360deg)] animate-[spin_4s_linear_infinite]" />
                </div>

                {/* Back of card (Revealed Cover Art) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-neutral-900 rounded-full overflow-hidden border-4 border-white/5 shadow-2xl">
                  <img 
                    src={question.correctSong.coverArt} 
                    alt="Album Cover" 
                    className="w-full h-full object-cover"
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>

              </div>
              <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-pulse pointer-events-none"></div>
            </div>

            <div className="flex-1 w-full text-center sm:text-left">
              <h2 className="text-sm uppercase tracking-widest text-blue-400 font-semibold mb-2">Now Playing Preview</h2>
              <h1 className="text-3xl sm:text-4xl font-bold mb-6">Which song is this?</h1>
              
              {/* Audio Player */}
              <AudioPlayer 
                url={question.correctSong.previewUrl} 
                autoPlay={true} 
                forcePause={isTransitioning}
              />
            </div>
          </div>
        </div>

        {/* Answers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-4xl">
          {question.options.map((option, index) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrectAnswer = option.id === question.correctSong.id;
            
            let buttonClass = "bg-white/5 hover:bg-white/10 border-white/10 text-white";
            let indicatorClass = "bg-white/5 text-white border-white/10 group-hover:bg-blue-500 group-hover:text-white";
            let titleClass = "";
            let dotEl = null;

            if (isRevealed) {
               if (isCorrectAnswer) {
                 buttonClass = "bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)] border-blue-500/50 scale-[1.02] opacity-100 z-10";
                 indicatorClass = "bg-blue-500 text-white shadow-lg shadow-blue-500/50 border-blue-500";
                 titleClass = "text-blue-100";
                 dotEl = (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"></div>
                  </div>
                 );
               } else if (isSelected && !isCorrectAnswer) {
                 buttonClass = "bg-red-500/20 border-red-500/50 scale-[0.98] opacity-80";
                 indicatorClass = "bg-red-500 text-white shadow-lg shadow-red-500/50 border-red-500";
                 titleClass = "text-red-100";
               } else {
                 buttonClass = "bg-white/5 border-white/10 opacity-30";
                 indicatorClass = "bg-white/10 text-gray-500 border-white/5 text-transparent";
               }
            }

            const letter = String.fromCharCode(65 + index); // A, B, C, D

            return (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={!isRevealed ? { scale: 1.02 } : {}}
                whileTap={!isRevealed ? { scale: 0.98 } : {}}
                key={option.id}
                onClick={() => handleOptionClick(option)}
                disabled={isRevealed}
                className={`group relative border rounded-2xl p-4 sm:p-5 text-left transition-colors duration-300 ${buttonClass}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-bold border transition-colors ${indicatorClass}`}>
                    {letter}
                  </span>
                  <div className="flex flex-col">
                    <span className={`text-base sm:text-lg font-medium line-clamp-1 ${titleClass}`}>{option.title}</span>
                    <span className="text-sm text-gray-400 line-clamp-1">{option.artist}</span>
                  </div>
                </div>
                {dotEl}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
