import { useState, useEffect } from 'react';

export const useKeyboardInput = (wordLength: number, onSubmit: (guess: string) => void) => {
  const [currentGuess, setCurrentGuess] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && currentGuess.length === wordLength) {
        onSubmit(currentGuess);
        setCurrentGuess('');
        return;
      }

      if (event.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
        return;
      }

      if (currentGuess.length >= wordLength) return;

      const key = event.key.toUpperCase();
      if (key.length === 1 && /^[A-Z]$/.test(key)) {
        setCurrentGuess(prev => prev + key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, wordLength, onSubmit]);

  return { currentGuess };
}; 