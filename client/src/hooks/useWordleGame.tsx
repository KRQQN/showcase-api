import { useState } from 'react';
import { GameState } from '../types/wordleTypes';

const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000/api' 
  : '/api';

export const useWordleGame = (wordLength: number) => {
  const [gameState, setGameState] = useState<GameState>({
    gameId: '',
    guesses: Array(6).fill(''),
    feedback: [],
    guessCount: 0,
    win: false,
    time: { minutes: 0, seconds: 0 },
    gameStarted: false,
    submitGuess: async () => {},
    resetWin: () => {}
  });

  const startGame = async () => {
    try {
      console.log('Making request to:', `${API_BASE_URL}/wordle/start-game`);
      const res = await fetch(`${API_BASE_URL}/wordle/start-game`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ wordLength }),
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      
      const text = await res.text();
      console.log('Raw response:', text);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const newGame = JSON.parse(text);
      console.log('Parsed response:', newGame);

      setGameState({
        ...gameState,
        gameId: newGame.id,
        gameStarted: true,
        guesses: Array(6).fill(''),
        feedback: [],
        guessCount: 0,
        win: false,
        time: { minutes: 0, seconds: 0 },
      });
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  const submitGuess = async (guess: string) => {
    if (guess.length !== wordLength) return;

    try {
      const res = await fetch(`${API_BASE_URL}/wordle/guess/${gameState.gameId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guess }),
      });
      const result = await res.json();

      const newGuesses = [...gameState.guesses];
      newGuesses[gameState.guessCount] = guess;

      const newFeedback = [...gameState.feedback];
      newFeedback[gameState.guessCount] = result.feedback;

      setGameState({
        ...gameState,
        guesses: newGuesses,
        feedback: newFeedback,
        guessCount: result.guessCount,
        win: result.win,
        time: result.win ? result.time : gameState.time,
      });
    } catch (error) {
      console.error('Failed to submit guess:', error);
    }
  };

  const resetWin = () => {
    setGameState({ ...gameState, win: false });
  };

  return {
    ...gameState,
    startGame,
    submitGuess,
    resetWin,
  };
};