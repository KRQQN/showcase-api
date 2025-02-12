import GameBoard from "@/components/wordle/GameBoard"
import { useState } from "react";


const Wordle = () => {
  const [gameId, setGameId] = useState('');
  
  const handleNewGame = async () => {
    const res = await fetch('/api/wordle/start-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const newGame = await res.json();
    console.log(res);
    setGameId(newGame.id);
  }
  return (
    gameId
    ? <GameBoard gameId={gameId}/>
    : <button onClick={handleNewGame}>Start Game</button>
  )
}

export default Wordle;