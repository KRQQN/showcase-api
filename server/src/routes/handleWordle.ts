import { randomUUID, UUID } from 'crypto';
import { Router, Request, Response } from 'express';
import { WhereOptions } from 'sequelize';

export const wordleRouter = Router();
//const gameSessions: { id: UUID; word: string; timestamp: number }[] = [];
const gameSessions = [{ id: '1234', word: 'WORDLE', guessCount: 0, timestamp: 1234567890 }];


type GuessFeedback = {
  letter: string;
  status: 'correct' | 'misplaced' | 'incorrect';
};

wordleRouter
  .get('/highscores', async (req: Request, res: Response) => {
    const items = await req.repository.findAll();
    items.length > 0 ? res.json(items) : res.json({ message: 'Not found' });
  })

  .get('/highscores/:id', async (req: Request, res: Response) => {
    const item = await req.repository.findByPk(req.params.id);
    item ? res.json(item) : res.status(404).json({ message: 'Not found' });
  })

  .post('/highscores', async (req: Request, res: Response) => {
    const newItem = await req.repository.create(req.body);
    newItem
      ? res.status(201).json(newItem)
      : res.status(400).json({ message: 'Failed to create' });
  })

  .delete('/highscores/:id', async (req: Request, res: Response) => {
    const deleted = await req.repository.destroy({
      where: { id: req.params.id } as WhereOptions
    });
    deleted
      ? res.status(204).json({ message: 'Deleted' })
      : res.status(404).json({ message: 'Not found' });
  })

  .post('/guess/:id', async (req: Request, res: Response) => {
    const gameSession = gameSessions.find((gameSession) => gameSession.id === req.params.id);
    if (!gameSession) throw new Error('Game session not found');

    const result = validateGuess(gameSession.word, req.body.guess);
    gameSession.guessCount++;
    

    res.json({feedback: result, guessCount: gameSession.guessCount});
    /* gameSession?.word === req.body.guess
      ? res.status(200).json({ guessCount: gameSession.guessCount, feedback: result, correct: true })
      : res.status(400).json({ guessCount: gameSession.guessCount, feedback: result, correct: false }); */
  })

  .post('/start-game', async (req: Request, res: Response) => {
    const gameSession = {
      id: randomUUID(),
      guessCount: 0,
      word: 'WORDLE',
      timestamp: new Date().getTime()
    };
    gameSessions.push(gameSession);
    res.json({ id: gameSession.id });
  });










  
const validateGuess = (word:string, guess: string) => {

  const guessArr = guess.split('');
  const wordArr = word.split('');
  const feedback = guessArr.map((letter) => ({ letter, status: 'incorrect' }));

  const letterCount = wordArr.reduce((acc: { [key: string]: number }, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
  
  guessArr.forEach((letter, i) => {
    if (letter === wordArr[i]) {
      letterCount[letter]--;
      feedback[i].status = 'correct';
    }
  });

  guessArr.forEach((letter, i) => {
    if (feedback[i].status !== 'correct' && letterCount[letter] > 0) {
      feedback[i].status = 'misplaced';
      letterCount[letter]--;
    }
  });

  return feedback;
};

