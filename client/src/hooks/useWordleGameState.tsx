import { useEffect, useState } from "react";
import { GameState } from "../types/wordleTypes";

const API_BASE_URL = "http://localhost:3000/api";

export const useWordleGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    gameId: "",
    wordLength: 6,
    guesses: Array(6).fill(""),
    feedback: [],
    guessCount: 0,
    win: false,
    time: { minutes: 0, seconds: 0 },
    gameStarted: false,
  });

  useEffect(() => {}, [gameState]);

  const startGame = async (wordLength: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/wordle/start-game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ wordLength }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const newGame = await res.json();

      setGameState({
        gameId: newGame.id,
        wordLength,
        guesses: Array(wordLength).fill(""),
        feedback: [],
        guessCount: 0,
        win: false,
        time: { minutes: 0, seconds: 0 },
        gameStarted: true,
      });
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  };

  const submitGuess = async (guess: string) => {
    if (guess.length !== gameState.wordLength || !gameState.gameStarted) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/wordle/guess/${gameState.gameId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guess }),
        },
      );
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
      console.error("Failed to submit guess:", error);
    }
  };

  const resetWin = () => {
    setGameState({ ...gameState, win: false });
  };

  const setWordLength = (wordLength: number) => {
    setGameState({
      ...gameState,
      wordLength: wordLength,
      guesses: Array(wordLength).fill(""),
      feedback: [],
      guessCount: 0,
      gameStarted: false,
    });
  };

  return {
    ...gameState,
    startGame,
    submitGuess,
    resetWin,
    setWordLength,
  };
};
