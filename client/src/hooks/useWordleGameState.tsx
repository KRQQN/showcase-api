import { useEffect, useState } from "react";
import { GameState } from "../types/wordleTypes";

export const useWordleGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    gameId: "",
    wordLength: 6,
    guesses: Array(6).fill(""),
    feedback: [],
    guessCount: 0,
    win: null,
    time: { minutes: 0, seconds: 0 },
    gameActive: false,
    correctWord: "",
  });

  useEffect(() => {}, [gameState]);

  const startGame = async (wordLength: number) => {
    try {
      const res = await fetch(`api/wordle/start-game`, {
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
        ...gameState,
        gameId: newGame.id,
        wordLength,
        guesses: Array(wordLength).fill(""),
        gameActive: true,
        feedback: [],
        guessCount: 0,
        win: null,
        time: { minutes: 0, seconds: 0 },
        correctWord: "",
      });
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  };

  const submitGuess = async (guess: string) => {
    if (guess.length !== gameState.wordLength || !gameState.gameActive) return;
    try {
      const res = await fetch(`api/wordle/guess/${gameState.gameId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        correctWord: result.correctWord,
      });
    } catch (error) {
      console.error("Failed to submit guess:", error);
    }
  };

  const resetGameBoard = () => {
    setGameState({
      gameId: "",
      wordLength: gameState.wordLength,
      guesses: Array(gameState.wordLength).fill(""),
      feedback: [],
      guessCount: 0,
      win: null,
      time: { minutes: 0, seconds: 0 },
      gameActive: false,
      correctWord: "",
    });
  };

  const resetWin = () => {
    setGameState({
      ...gameState,
      win: null,
    });
  };

  const setWordLength = (wordLength: number) => {
    setGameState({
      ...gameState,
      wordLength: wordLength,
      guesses: Array(wordLength).fill(""),
      feedback: [],
      guessCount: 0,
      gameActive: false,
    });
  };

  return {
    ...gameState,
    startGame,
    submitGuess,
    resetGameBoard,
    setWordLength,
    resetWin,
  };
};
