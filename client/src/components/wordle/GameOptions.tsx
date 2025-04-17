import { Box, Flex, HStack, Button, Text } from '@chakra-ui/react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface GameOptionsProps {
  wordLength: number;
  changeWordLength: (increment: boolean) => void;
  startGame: () => Promise<void>;
}

const GameOptions = ({ wordLength, changeWordLength, startGame }: GameOptionsProps) => {
  return (
    <Box w="100%" maxW="800px" mx="auto" p={4}>
      <Flex direction="column" align="center" gap={8}>
        <Text fontSize="4xl" fontWeight="bold">
          W O R D L E
        </Text>
        <Flex direction="column" align="center" gap={4}>
          <Text fontSize="xl">Choose word length:</Text>
          <HStack>
            <Button
              aria-label="Decrease word length"
              onClick={() => changeWordLength(false)}
              disabled={wordLength <= 3}
            >
              <FaMinus />
            </Button>
            <Text fontSize="2xl" fontWeight="bold">
              {wordLength}
            </Text>
            <Button
              aria-label="Increase word length"
              onClick={() => changeWordLength(true)}
              disabled={wordLength >= 10}
            >
              <FaPlus />
            </Button>
          </HStack>
          <Button colorScheme="blue" size="lg" onClick={startGame}>
            Start Game
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default GameOptions;
