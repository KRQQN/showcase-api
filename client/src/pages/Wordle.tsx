import BackgroundLayout from "@/components/layout/bg";
import GameBoard from "@/components/wordle/GameBoard";
import GameOptions from "@/components/wordle/GameOptions";
import VirtualKeyboard from "@/components/wordle/VirtualKeyboard";
import GameResultModal from "@/components/wordle/GameResultModal";
import { useEffect } from "react";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useWordleGameState } from "@/hooks/useWordleGameState";

const Wordle = () => {
  const gameState = useWordleGameState();
  const { currentInput, setCurrentInput } = useKeyboardInput(
    gameState.gameActive,
    gameState.wordLength,
    {
      key: "Enter",
      action: gameState.submitGuess,
    },
  );

  useEffect(() => {
    setCurrentInput("");
  }, [gameState.wordLength, gameState.gameActive, gameState.win]);

  return (
    <BackgroundLayout>
      <GameOptions gameState={gameState} />
      <GameBoard gameState={gameState} currentInput={currentInput} />
      <VirtualKeyboard />
      {gameState.win !== null && <GameResultModal gameState={gameState} />}
    </BackgroundLayout>
  );
};

export default Wordle;
