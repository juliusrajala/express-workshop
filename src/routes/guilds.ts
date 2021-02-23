import router from 'express-promise-router';
import { NextFunction, Request, Response } from 'express';
import { ulid } from 'ulid';
import { getGuildById, getGuilds, searchGuilds } from '../data/guilds';
import { DBObject } from '../middleware/data';

const guildRoutes = router();

guildRoutes.get('/', async (req: Request, res: Response) => {
  const db = req.app.locals.db;
  const result = await getGuilds(db);
  res.status(200).send(result);
});

/*
{
  "id":"01EZ4JWE4535H1MG9Z4GCRMCM7"
  "name":"Digit"
  "subject":"Tietotekniikka"
  "city":"Turku"
}
*/

interface RequestBody {
  name: string;
  subject: string;
  city: string;
}

guildRoutes.post('/', async (req: Request, res: Response) => {
  const db: DBObject = req.app.locals.db;

  const guildBody: RequestBody = req.body;

  if ('name' in guildBody) {
    const oldGuilds = await getGuilds(db);
    const newGuilds = oldGuilds.concat({
      name: guildBody.name,
      city: guildBody.city,
      subject: guildBody.subject,
      id: ulid()
    })
    db.setGuilds(newGuilds);
    return res.status(201).send(newGuilds);
  }

  res.status(406).send('Request body was bad');
})

guildRoutes.get('/:id', async (req: Request, res: Response) => {
  const db = req.app.locals.db;
  const id = req.params.id;
  const result = await getGuildById(db, id);
  res.status(200).send(result);
});

guildRoutes.get('/:key/:value', async (req: Request, res: Response) => {
  const db = req.app.locals.db;
  const key = req.params.key;
  const value = req.params.value;
  const result = await searchGuilds(db, key, value);
  res.status(200).send(result);
});


export default guildRoutes;