import { Box, Flex, Text, HStack } from '@chakra-ui/react';
import WordleRow from './WordleRow';
import { GameState } from '@/types/wordleTypes';

interface GameBoardProps extends GameState {
  wordLength: number;
  currentGuess: string;
}

const GameBoard = ({ wordLength, currentGuess, ...gameState }: GameBoardProps) => {
  const {
    guesses,
    feedback,
    guessCount,
  } = gameState;

  const allRows = [...guesses];
  if (currentGuess) {
    allRows[guessCount] = currentGuess;
  }

  return (
    <Box w="100%" maxW="800px" mx="auto" p={4}>
      <Flex direction="column" align="center" gap={4}>
        <Text fontSize="4xl" fontWeight="bold">
          W O R D L E
        </Text>
        <HStack mb={4}>
          <Text>Word Length: {wordLength}</Text>
        </HStack>


        <Box mb={4}>
          {Array(6).fill(0).map((_, index) => (
            <WordleRow
              key={index}
              word={allRows[index] || ''}
              feedback={feedback[index] || []}
              wordLength={wordLength}
            />
          ))}
        </Box>

        <Flex direction="column" align="center" gap={2} w="100%" maxW="400px">
          <Text fontSize="lg" fontWeight="bold">
            Guesses remaining: {6 - guessCount}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Type your guess and press Enter to submit
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default GameBoard;
