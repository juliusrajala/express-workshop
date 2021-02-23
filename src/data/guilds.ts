import { DBObject } from '../middleware/data';
import { Guild } from './types';

const getGuildData = async (db: DBObject): Promise<Guild[]> => {
  // Database operations in JavaScript are mainly asynchronous by nature
  // either through callbacks or promise-implementations.
  return Promise.resolve(db.getGuilds());
}


export const getGuilds = async (db: DBObject): Promise<Guild[]> => {
  return getGuildData(db);
}


export const getGuildById = async (db: DBObject, id: string): Promise<Guild | void> => {
  const guilds = await getGuildData(db);
  const match = guilds.find(item => item.id === id);

  if (!match) {
    throw Error('No guild found with ID');
  }

  return match;
}


export const searchGuilds = async (db: DBObject, key: string, value: string): Promise<Guild[]> => {
  const guilds = await getGuildData(db);
  const matches = guilds.filter(item => item[key] === value);

  return matches;
}