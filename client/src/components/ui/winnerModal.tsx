import styled from 'styled-components';
import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { StatusColors } from '@/types/wordleTypes';
import LetterFeedbackBox from '../wordle/LetterFeedbackBox';

interface WinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  time?: { minutes: number; seconds: number };
  correctWord: string;
}

const WinnerModal = ({ isOpen, onClose, time, correctWord }: WinnerModalProps) => {
  if (!isOpen) return null;

  return (
    <StyledWrapper>
      <form className="form" style={{zIndex:999}}>
        <span className="close" onClick={onClose}>
          X
        </span>
        <div className="info">
          <span className="title">YOU WON</span>
          <p className="description">
            Minutes: {time?.minutes} Seconds: {time?.seconds}
          </p>
        </div>
        <Box w={'100%'} className="input-fields">
          <Flex justify={'center'}>
            {correctWord.split('').map((letter, index) => (
              <LetterFeedbackBox key={index} letter={letter} status={StatusColors.correct} />
            ))}
          </Flex>
        </Box>
        <div className="action-btns">
          <a href="#" className="verify">
            SUBMIT HIGHSCORE?
          </a>
          <a href="#" className="clear">
            PLAY AGAIN?
          </a>
        </div>
      </form>
    </StyledWrapper>
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

  /*----heading and description-----*/

  .title {
    font-size: 1.5rem;
    font-weight: 900;
  }

  .description {
    margin-top: 10px;
    font-size: 1rem;
  }

  /*----input-fields------*/

  .form .input-fields {
    width: 100%;
    hight: 100%;
  }

  .form .input-fields input:focus {
    border: 1px solid var(--af-white);
    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);
    transition: 0.5s;
  }

  /*-----verify and clear buttons-----*/

  .action-btns {
    display: flex;
    margin-top: 20px;
    gap: 0.5rem;
  }

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

  /*-----close button------*/

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

export default WinnerModal;
