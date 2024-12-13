import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

addRxPlugin(RxDBDevModePlugin);

const gameSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    date: {
      type: 'string'
    },
    homeTeam: {
      type: 'string'
    },
    awayTeam: {
      type: 'string'
    },
    location: {
      type: 'string'
    },
    stats: {
      type: 'object',
      properties: {
        points: {
          type: 'number',
          minimum: 0
        },
        blocks: {
          type: 'number',
          minimum: 0
        },
        charges: {
          type: 'number',
          minimum: 0
        }
      }
    }
  },
  required: ['id', 'date', 'homeTeam', 'awayTeam', 'location', 'stats']
};

export const createDb = async () => {
  const db = await createRxDatabase({
    name: 'basketballstatsdb',
    storage: getRxStorageDexie()
  });

  await db.addCollections({
    games: {
      schema: gameSchema
    }
  });

  return db;
};

export type GameDocument = {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  stats: {
    points: number;
    blocks: number;
    charges: number;
  };
};