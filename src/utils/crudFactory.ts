import { Router, Request, Response } from 'express';
import { Repository, Model } from 'sequelize-typescript';
import { WhereOptions } from 'sequelize';

export function crudFactory<T extends Model>(repository: Repository<T>): Router {
  return Router()
    .get('/', async (req: Request, res: Response) => {
      const items = await repository.findAll();
      items.length > 0
			? res.json(items)
			: res.json({ message: 'Not found' });
    })

    .get('/:id', async (req: Request, res: Response) => {
      const item = await repository.findByPk(req.params.id);
      item 
			? res.json(item) 
			: res.status(404).json({ message: 'Not found' });
    })

    .post('/', async (req: Request, res: Response) => {
      const newItem = await repository.create(req.body);
      newItem
        ? res.status(201).json(newItem)
        : res.status(400).json({ message: 'Failed to create' });
    })

    .put('/:id', async (req: Request, res: Response) => {
      const [updatedCount] = await repository.update(req.body, {
        where: { id: req.params.id } as WhereOptions
      });
      updatedCount
        ? res.json({ message: 'Updated' })
        : res.status(404).json({ message: 'Not found' });
    })

    .delete('/:id', async (req: Request, res: Response) => {
      const deleted = await repository.destroy({
        where: { id: req.params.id } as WhereOptions
      });
      deleted
        ? res.status(204).json({ message: 'Deleted' })
        : res.status(404).json({ message: 'Not found' });
    });
}
