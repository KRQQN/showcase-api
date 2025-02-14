import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { LetterFeedback } from './types/wordleTypes';
import WordleRow from './WordleRow';
import WinnerModal from '../ui/winnerModal';

const GameBoard = ({ gameId }: { gameId: string }) => {
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesscount, setGuessCount] = useState(0);
  const [win, setWin] = useState(false);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });

  const [feedback, setFeedback] = useState<LetterFeedback[][]>([]);
  const [wordLength, setWordLength] = useState(6);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const guessRes = await fetch(`/api/wordle/guess/${gameId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ guess: currentGuess })
    });

    const result = await guessRes.json();
    setGuessCount(result.guessCount);
    
    if (result.win) {
      setWin(true);
      setTime(result.time);
    }

    const newGuesses = [...guesses];
    newGuesses[guesscount] = currentGuess;

    const newFeedback = [...feedback];
    newFeedback[guesscount] = result.feedback;

    setGuesses(newGuesses);
    setFeedback(newFeedback);
    setCurrentGuess('');
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value.toUpperCase();

    if (newVal.length <= wordLength) {
      setCurrentGuess(newVal);
      setGuesses((prevGuesses) =>
        prevGuesses.map((guess, index) => (index === guesscount ? newVal : guess))
      );
    }
  };

  return (
    <Box h={5} w={'100vw'}>
      <Text fontSize={'4xl'}>W O R D L E</Text>
      {win && (
        <WinnerModal isOpen={win} time={time} onClose={() => setWin(false)}>
          <WordleRow
            word={guesses[guesscount - 1]}
            feedback={feedback[guesscount - 1]}
          />
        </WinnerModal>
      )}

        {guesses.map((guess, index) => (
          <WordleRow word={guess} feedback={feedback[index]} />
        ))}

      <Flex justify={'center'} align={'center'} direction={'column'}>
        <Text>Guesses remaining: {6 - guesscount}</Text>
        <Input
          h={{mdDown: '3rem'}}
          m={2}
          w={{base: '30%',mdDown: '50vw'}}
          bg={'gray.400/20'}
          type="text"
          value={currentGuess}
          onChange={handleInput}
        />
        <Button bg={'gray.500'} onClick={async (e) => handleSubmit(e)}>
          SUBMIT
        </Button>
      </Flex>


      </Box>
  );
};

export default GameBoard;
