export enum StatusColors {
  correct = "green",
  misplaced = "yellow.fg",
  incorrect = "red",
  default = "blackAlpha.500",
}

export type LetterFeedback = {
  letter: string;
  status: "correct" | "misplaced" | "incorrect";
};

export type GameState = {
  gameId: string;
  wordLength: number;
  guesses: string[];
  feedback: LetterFeedback[][];
  guessCount: number;
  win: boolean | null;
  time: { minutes: number; seconds: number };
  gameActive: boolean;
  correctWord: string;
};

export interface WordleGameStateOptions extends GameState {
  startGame: (wl: number) => Promise<void>;
  submitGuess: (guess: string) => Promise<void>;
  resetWin: () => void;
  setWordLength: (wl: number) => void;
  resetGameBoard: () => void;
}
