import { Sequelize } from 'sequelize';

import { DATABASE_URL } from '../util/config';
import logger from '../util/logger';
import { SequelizeStorage, Umzug } from 'umzug';

export const sequelize = new Sequelize(DATABASE_URL, { logging: false });

const umzug = new Umzug({
  migrations: { glob: 'src/server/migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export type Migration = typeof umzug._types.migration;

const runMigrations = async () => {
  const migrations = await umzug.up();

  logger.info('Migrations up to date!', {
    migrations,
  });
};

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const connectToDataBase = async (attempt = 0): Promise<void | null> => {
  try {
    await sequelize.authenticate();
    await runMigrations();
  } catch (err: any) {
    if (attempt === 10) {
      logger.error(`Connection to database couldn't be established after ${attempt} tries!`, {
        error: err.stack,
      });

      return process.exit(1);
    }
    logger.info(`Connection to database failed! Attempt ${attempt}/10`);
    logger.error('Database error: ', err);
    await sleep(5000);

    return connectToDataBase(attempt + 1);
  }

  return null;
};
