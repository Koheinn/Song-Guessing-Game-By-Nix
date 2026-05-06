import { useState, useCallback } from 'react';
import { Song, QuestionType, GameStatus, GameMode } from '../types';
import { fetchSongs } from '../services/musicService';
import { shuffleArray } from '../utils/math';

const QUESTIONS_PER_GAME = 10;

export function useGame() {
  const [status, setStatus] = useState<GameStatus>('start');
  const [pool, setPool] = useState<Song[]>([]);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [mode, setMode] = useState<GameMode>('pop');

  const startGame = useCallback(async (selectedMode?: GameMode) => {
    try {
      setError(null);
      setStatus('loading');
      
      const gameMode = selectedMode || mode;
      
      // If changing mode, we should fetch new pool
      const isNewMode = selectedMode && selectedMode !== mode;
      if (isNewMode) {
        setMode(selectedMode);
      }
      
      let currentPool = pool;
      
      // Fetch songs if pool is empty or too small, or if mode changed
      if (currentPool.length < QUESTIONS_PER_GAME + 10 || isNewMode) {
        const fetched = await fetchSongs(gameMode);
        if (fetched.length < QUESTIONS_PER_GAME) {
           throw new Error("Not enough songs found to play in this mode.");
        }
        currentPool = fetched;
        setPool(fetched);
      }

      // Pick correct songs
      const shuffledPool = shuffleArray<Song>(currentPool);
      const correctSongs = shuffledPool.slice(0, QUESTIONS_PER_GAME);

      // Generate options
      const generatedQuestions = correctSongs.map((correctSong: Song) => {
        const wrongOptionsPool = currentPool.filter((s: Song) => s.id !== correctSong.id);
        const shuffledWrong = shuffleArray<Song>(wrongOptionsPool);
        const options: Song[] = [correctSong, ...shuffledWrong.slice(0, 3)];
        
        return {
          correctSong,
          options: shuffleArray<Song>(options),
        };
      });

      setQuestions(generatedQuestions);
      setCurrentIndex(0);
      setScore(0);
      setStatus('playing');
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Error starting game. Please try again.");
      setStatus('start');
    }
  }, [pool, mode]);

  const answerQuestion = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    
    // Proceed to next or end game
    if (currentIndex < QUESTIONS_PER_GAME - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setStatus('finished');
    }
  }, [currentIndex]);

  const resetGame = useCallback(() => {
    setStatus('start');
  }, []);

  return {
    status,
    questions,
    currentIndex,
    score,
    error,
    mode,
    startGame,
    answerQuestion,
    resetGame,
    totalQuestions: QUESTIONS_PER_GAME
  };
}
