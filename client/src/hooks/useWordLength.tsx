import { useState } from 'react';

export const useWordLength = (initialLength: number = 5) => {
  const [wordLength, setWordLength] = useState(initialLength);

  const changeWordLength = (increment: boolean) => {
    const newLength = increment ? wordLength + 1 : wordLength - 1;
    if (newLength >= 3 && newLength <= 10) {
      setWordLength(newLength);
    }
  };

  return { wordLength, changeWordLength };
};