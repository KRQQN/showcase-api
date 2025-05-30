import styled from "styled-components";
import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { StatusColors, WordleGameStateOptions } from "@/types/wordleTypes";
import LetterFeedbackBox from "../wordle/LetterFeedbackBox";

interface ModalContentWrapperProps {
  title: string;
  description?: string | ReactNode;
  onClose: () => void;
  children: ReactNode;
}

const ModalContentWrapper = ({
  title,
  description,
  onClose,
  children,
}: ModalContentWrapperProps) => {
  return (
    <StyledWrapper>
      <div className="form" style={{ zIndex: 555 }}>
        <span className="close" onClick={onClose}>
          X
        </span>
        <div className="info">
          <span className="title">{title}</span>
          {description && <p className="description">{description}</p>}
        </div>
        {children}
      </div>
    </StyledWrapper>
  );
};

interface WordDisplayProps {
  word: string;
  win: boolean;
}

const WordDisplay = ({ win, word }: WordDisplayProps) => {
  return (
    <Box w="100%" className="input-fields">
      <Flex justify="center">
        {word.split("").map((letter, index) => (
          <LetterFeedbackBox
            key={index}
            letter={letter}
            status={win ? StatusColors.correct : StatusColors.incorrect}
          />
        ))}
      </Flex>
    </Box>
  );
};

const GameResultModal = ({
  gameState,
}: {
  gameState: WordleGameStateOptions;
}) => {
  if (gameState.win === null) return;
  return (
    <ModalContentWrapper
      title={gameState.win ? "YOU WON" : "YOU LOST"}
      description={
        gameState.win
          ? gameState.time
            ? `Minutes: ${gameState.time.minutes} Seconds: ${gameState.time.seconds}`
            : undefined
          : `The correct word was:`
      }
      onClose={gameState.resetWin}
    >
      <WordDisplay win={gameState.win} word={gameState.correctWord || " "} />
      <StyledActionButtons className="action-btns">
        {gameState.win && (
          <a href="#" className="verify">
            SUBMIT HIGHSCORE?
          </a>
        )}
        <button
          onClick={() => gameState.startGame(gameState.wordLength)}
          className="clear"
        >
          PLAY AGAIN?
        </button>
      </StyledActionButtons>
    </ModalContentWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    --black: #000000;
    --ch-black: #141414;
    --eer-black: #1b1b1b;
    --night-rider: #2e2e2e;
    --white: #ffffff;
    --af-white: #f3f3f3;
    --ch-white: #e1e1e1;
    --tomato: #fa5656;

    padding: 25px;
    display: flex;
    max-width: 420px;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    color: var(--af-white);
    background-color: var(--black);
    border-radius: 8px;

    /* Center the modal */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 1.5rem;
    font-weight: 900;
  }

  .description {
    margin-top: 10px;
    font-size: 1rem;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: var(--night-rider);
    color: var(--ch-white);
    height: 30px;
    width: 30px;
    display: grid;
    place-items: center;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.5s ease;
  }

  .close:hover {
    background-color: var(--tomato);
    color: var(--white);
  }
`;

const StyledActionButtons = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 0.5rem;

  .verify {
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    color: var(--night-rider);
    text-shadow: none;
    background: var(--af-white);
    box-shadow: transparent;
    border: 1px solid var(--af-white);
    transition: 0.3s ease;
    user-select: none;
  }

  .verify:hover,
  .verify:focus {
    color: var(--night-rider);
    background: var(--white);
  }

  .clear {
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    color: var(--ch-white);
    text-shadow: none;
    background: transparent;
    border: 1px solid var(--ch-white);
    transition: 0.3s ease;
    user-select: none;
  }

  .clear:hover,
  .clear:focus {
    color: var(--tomato);
    background-color: transparent;
    border: 1px solid var(--tomato);
  }
`;

export default GameResultModal;
