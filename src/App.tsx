import { StartScreen } from "./components/StartScreen";
import { GameScreen } from "./components/GameScreen";
import { GameOverScreen } from "./components/GameOverScreen";
import { Loader2, AlertCircle } from "lucide-react";
import { useGame } from "./hooks/useGame";

export default function App() {
  const {
    status,
    questions,
    currentIndex,
    score,
    error,
    mode,
    startGame,
    answerQuestion,
    resetGame,
    totalQuestions
  } = useGame();

  return (
    <main className="min-h-screen bg-[#050508] font-sans text-white overflow-hidden flex flex-col relative">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto py-8 flex flex-col flex-1">
        {error && status === "start" && (
          <div className="mx-auto mt-4 mb-8 bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {status === "start" && <StartScreen onStart={(mode) => startGame(mode)} />}
        
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-gray-400 font-medium tracking-wide uppercase text-sm">Building your playlist...</p>
          </div>
        )}
        
        {status === "playing" && questions.length > 0 && (
          <GameScreen 
            question={questions[currentIndex]}
            currentQuestionIndex={currentIndex}
            totalQuestions={totalQuestions}
            score={score}
            onAnswer={answerQuestion}
            onEndGame={resetGame}
          />
        )}

        {status === "finished" && (
          <GameOverScreen
            score={score}
            totalQuestions={totalQuestions}
            mode={mode}
            onRestart={resetGame}
          />
        )}
      </div>
    </main>
  );
}
