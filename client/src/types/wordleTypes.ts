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
  win: boolean;
  time: { minutes: number; seconds: number };
  gameStarted: boolean;
};
