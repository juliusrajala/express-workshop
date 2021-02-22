import router from 'express-promise-router';
import { Request, Response } from 'express';
import { ulid } from 'ulid';

const routes = router();

routes.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello world');
});

routes.get('/ulid', (req: Request, res: Response) => {
  res.status(200).send(ulid())
})


export default routes;