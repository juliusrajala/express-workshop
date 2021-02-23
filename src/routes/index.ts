import router from 'express-promise-router';
import { NextFunction, Request, Response } from 'express';
import { ulid } from 'ulid';
import guildRoutes from './guilds';

const routes = router();

routes.get('/', async (req: Request, res: Response) => {
  res.status(200).send('Hello world');
});

routes.get('/ulid', async (req: Request, res: Response) => {
  res.status(200).send(ulid())
})

routes.use('/guilds', guildRoutes);

export default routes;