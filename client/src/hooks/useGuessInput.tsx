import { useState } from 'react';

export const useGuessInput = (
  wordLength: number,
  guessCount: number,
  guesses: string[],
  setGuesses: (guesses: string[]) => void
) => {
  const [currentGuess, setCurrentGuess] = useState('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value.toUpperCase();
    if (newVal.length <= wordLength) {
      setCurrentGuess(newVal);
      setGuesses(
        guesses.map((guess, index) => (index === guessCount ? newVal : guess))
      );
    }
  };

  const clearGuess = () => {
    setCurrentGuess('');
  };

  return { currentGuess, handleInput, clearGuess };
};