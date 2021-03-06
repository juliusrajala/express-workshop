import { Request, Response, NextFunction } from 'express';
import memoryCache from 'memory-cache';
import mockGuilds from '../data/mocks/guilds.json';
import { Guild } from '../data/types';

export interface DBObject {
  getGuilds: () => Guild[];
  setGuilds: (guilds: Guild[]) => void;
}

const guildsKey = 'guilds_mem_key';

export const createDataMiddleware = () => {
  memoryCache.put(guildsKey, mockGuilds);
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.app.locals['db']) {
      req.app.locals['db'] = {
        setGuilds: (newGuilds: Guild[]) => memoryCache.put(guildsKey, newGuilds),
        getGuilds: () => memoryCache.get(guildsKey)
      };
    }

    next();
  };
}