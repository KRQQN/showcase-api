import { Router, Request, Response } from 'express';
import { IRepository } from '../repositories/IRepository';

export function crudFactory<T>(repository: IRepository<T>): Router {
  return Router()

    .get('/', async (req: Request, res: Response) => {
      const items = await repository.getAll();
      res.json(items);
    })

    .get('/:id', async (req: Request, res: Response) => {
      const item = await repository.getById(Number(req.params.id));
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    })

    .post('/', async (req: Request, res: Response) => {
      const newItem = await repository.create(req.body as T);
      res.status(201).json(newItem);
    })

    .put('/:id', async (req: Request, res: Response) => {
      const updatedItem = await repository.update(
        Number(req.params.id),
        req.body as T
      );
      if (updatedItem) {
        res.json(updatedItem);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    })

    .delete('/:id', async (req: Request, res: Response) => {
      const deleted = await repository.delete(Number(req.params.id));
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    });
}
