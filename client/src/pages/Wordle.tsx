import BackgroundLayout from "@/components/layout/bg";
import GameBoard from "@/components/wordle/GameBoard"
import GameOptions from "@/components/wordle/GameOptions";
import { useWordleGame } from "@/hooks/useWordleGame";
import { useWordLength } from "@/hooks/useWordLength";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { useEffect } from "react";
import WinnerModal from "@/components/ui/winnerModal";

const Wordle = () => {
  const { wordLength, changeWordLength } = useWordLength(6);
  const { gameStarted, startGame, submitGuess, ...gameState } = useWordleGame(wordLength);
  const { currentGuess } = useKeyboardInput(wordLength, submitGuess);

  useEffect(() => {

  }, [gameStarted, gameState.win]);

  return ( 
    <BackgroundLayout>
      {!gameStarted ? (
        <GameOptions 
          wordLength={wordLength}
          changeWordLength={changeWordLength}
          startGame={startGame}
        />
      ) : (
        <>
          <GameBoard 
            gameStarted={gameStarted}
            wordLength={wordLength}
            currentGuess={currentGuess}
            submitGuess={submitGuess}
            {...gameState}
          />

          <WinnerModal isOpen={gameState.win} correctWord={gameState.guesses[gameState.guessCount - 1]} onClose={gameState.resetWin}/>
        </>
      )}
    </BackgroundLayout>
  )  
}

export default Wordle;