import BackgroundLayout from "@/components/layout/bg";
import GameBoard from "@/components/wordle/GameBoard";
import GameOptions from "@/components/wordle/GameOptions";
import VirtualKeyboard from "@/components/wordle/VirtualKeyboard";
import WinnerModal from "@/components/ui/winnerModal";
import { useEffect } from "react";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useWordLength } from "@/hooks/useWordLength";
import { useWordleGameState } from "@/hooks/useWordleGameState";

const Wordle = () => {
  const { wordLength, changeWordLength } = useWordLength(6);
  const gameState = useWordleGameState();
  const { currentInput } = useKeyboardInput(6, {
    key: "Enter",
    action: gameState.submitGuess,
  });
  useEffect(() => {}, [gameState.gameStarted, gameState.win]);

  return (
    <BackgroundLayout>
      {!gameState.gameStarted ? (
        <GameOptions
          wordLength={wordLength}
          changeWordLength={changeWordLength}
          startGame={gameState.startGame}
        />
      ) : (
        <>
          <GameBoard gameState={gameState} currentInput={currentInput} />
          <VirtualKeyboard />
          <WinnerModal
            isOpen={gameState.win}
            correctWord={gameState.guesses[gameState.guessCount - 1]}
            onClose={gameState.resetWin}
          />
        </>
      )}
    </BackgroundLayout>
  );
};

export default Wordle;
