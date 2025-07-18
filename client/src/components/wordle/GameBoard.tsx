import { Box, Flex, Text } from "@chakra-ui/react";
import WordleRow from "./WordleRow";
import { useMemo } from "react";
import { GameState } from "@/types/wordleTypes";

const GameBoard = ({
  gameState,
  currentInput,
}: {
  gameState: GameState;
  currentInput: string;
}) => {
  const { guesses, wordLength, feedback, guessCount } = gameState;

  const allRows = useMemo(() => {
    const rows = [...guesses];
    if (currentInput && guessCount < wordLength) {
      rows[guessCount] = currentInput;
    }
    return rows;
  }, [guesses, currentInput]);

  return (
    <Box w="100%" maxW="800px" mx="auto" p={4} mt={24}>
      <Flex direction="column" align="center" gap={4}>
        <Box mb={4}>
          {Array(wordLength)
            .fill(0)
            .map((_, index) => (
              <WordleRow
                key={index}
                word={allRows[index] || ""}
                feedback={feedback[index] || ""}
                wordLength={wordLength}
              />
            ))}
        </Box>

        <Flex direction="column" align="center" gap={2} w="100%" maxW="400px">
          <Text fontSize="lg" fontWeight="bold">
            Guesses remaining: {wordLength - guessCount}
          </Text>
          <Text marginTop="1rem" fontSize="sm" color="gray.500">
            Type your guess and press Enter to submit
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default GameBoard;
