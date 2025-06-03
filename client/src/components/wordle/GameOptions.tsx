import { Box, Flex, HStack, Button, Text, Icon } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaMinus, FaPlus, FaCog } from "react-icons/fa";

interface WordleGameStateOptions {
  wordLength: number;
  gameActive: boolean;
  setWordLength: (length: number) => void;
  startGame: (length: number) => void;
}

const MotionBox = motion(Box);

const MIN_WORD_LENGTH = 3;
const MAX_WORD_LENGTH = 10;

const GameOptions = ({ gameState }: { gameState: WordleGameStateOptions }) => {
  const [show, setShow] = useState(true);

  return (
    <Flex position="relative" top="3.5rem" mx="auto" w={"23.5rem"}>
      <Button
        bg={"none"}
        border={"none"}
        color={"whiteAlpha.800"}
        focusRing={"none"}
        onClick={() => setShow(!show)}
        aria-content={show ? "Hide options" : "Show options"}
        css={{
          "& svg": {
            transition: "transform 0.3s",
            transform: show ? "rotate(90deg)" : "rotate(0deg)",
          },
        }}
        position="absolute"
        top={2}
        right={2}
        minW="2rem"
        zIndex={2}
      >
        <Box bg="none">
          <Icon as={FaCog} boxSize="1.8rem" color="white" />
        </Box>
      </Button>
      <MotionBox
        bg="blackAlpha.600"
        initial={{ width: 0, height: 0, opacity: show ? 1 : 0 }}
        animate={{
          width: show ? "22.5rem" : 0,
          height: show ? "auto" : 0,
          borderRadius: "1rem",
          borderBottomLeftRadius: show ? "1rem" : "full",
          borderTopLeftRadius: show ? "1rem" : "full",
          opacity: show ? 1 : 0,
          backdropFilter: show ? "blur(0.5rem)" : "blur(0.5rem)",
        }}
        transition={{ duration: 0.5 }}
        overflow="hidden"
        transformOrigin="top right"
        p={show ? 6 : 30}
        position="absolute"
        top={2}
        right={2}
      >
        {show && (
          <MotionBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            pt={10}
          >
            <Flex direction="column" align="center" gap={4}>
              <Text fontSize="xl" fontWeight="semibold">
                Choose Word Length
              </Text>
              <HStack gap={4}>
                <Tooltip
                  content={
                    gameState.wordLength <= MIN_WORD_LENGTH
                      ? "Minimum word length reached"
                      : ""
                  }
                  disabled={gameState.wordLength > MIN_WORD_LENGTH}
                >
                  <Button
                    size="sm"
                    colorScheme="gray"
                    aria-label="Decrease word length"
                    onClick={() =>
                      gameState.setWordLength(gameState.wordLength - 1)
                    }
                    disabled={gameState.wordLength <= MIN_WORD_LENGTH}
                    _hover={{ bg: "gray.600" }}
                  >
                    <FaMinus />
                  </Button>
                </Tooltip>
                <Text fontSize="3xl" fontWeight="bold">
                  {gameState.wordLength}
                </Text>
                <Tooltip
                  content={
                    gameState.wordLength >= MAX_WORD_LENGTH
                      ? "Maximum word length reached"
                      : ""
                  }
                  disabled={gameState.wordLength < MAX_WORD_LENGTH}
                >
                  <Button
                    size="sm"
                    colorScheme="gray"
                    aria-label="Increase word length"
                    onClick={() =>
                      gameState.setWordLength(gameState.wordLength + 1)
                    }
                    disabled={gameState.wordLength >= MAX_WORD_LENGTH}
                    _hover={{ bg: "gray.600" }}
                  >
                    <FaPlus />
                  </Button>
                </Tooltip>
              </HStack>
              <Button
                colorScheme="blue"
                size="lg"
                w="full"
                disabled={gameState.gameActive}
                onClick={() => {
                  gameState.startGame(gameState.wordLength);
                  setShow(false);
                }}
                _hover={{
                  transform: "scale(1.05)",
                  transition: "transform 0.2s",
                }}
              >
                Start Game
              </Button>
            </Flex>
          </MotionBox>
        )}
      </MotionBox>
    </Flex>
  );
};

export default GameOptions;
