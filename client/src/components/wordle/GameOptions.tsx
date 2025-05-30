import { WordleGameStateOptions } from "@/types/wordleTypes";
import { Box, Flex, HStack, Button, Text } from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa";

const GameOptions = ({ gameState }: { gameState: WordleGameStateOptions }) => {
  return (
    <Box w="100%" maxW="800px" mx="auto" p={2}>
      <Flex direction="column" align="center" gap={2}>
        <Text fontSize="4xl" fontWeight="bold">
          W O R D L E
        </Text>
        <Flex direction="column" align="center" gap={2}>
          <Text fontSize="xl">Choose word length:</Text>
          <HStack>
            <Button
              h={7}
              w={10}
              aria-label="Decrease word length"
              onClick={() => gameState.setWordLength(gameState.wordLength - 1)}
              disabled={gameState.wordLength <= 3}
            >
              <FaMinus />
            </Button>
            <Text fontSize="2xl" fontWeight="bold">
              {gameState.wordLength}
            </Text>
            <Button
              h={7}
              w={10}
              aria-label="Increase word length"
              onClick={() => gameState.setWordLength(gameState.wordLength + 1)}
              disabled={gameState.wordLength >= 10}
            >
              <FaPlus />
            </Button>
          </HStack>
          <Button
            h={"2rem"}
            w={32}
            colorScheme="blue"
            size="lg"
            zIndex={999}
            onClick={() => gameState.startGame(gameState.wordLength)}
            disabled={gameState.gameActive}
          >
            Start Game
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default GameOptions;
