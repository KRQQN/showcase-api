export enum StatusColors {
    correct = 'green',
    misplaced = 'yellow.fg',
    incorrect = 'red',
    default = 'blackAlpha.500'
}

export type LetterFeedback = {
    letter: string;
    status: 'correct' | 'misplaced' | 'incorrect';
};