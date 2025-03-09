import type { Database } from '@server/database';
import { userRepository } from './userRepository';
import { transactionsRepository } from './transactionsRepository';
import { assetsRepository } from './assetsRepository';

export type RepositoryFactory = <T>(db: Database) => T;

// index of all repositories for provideRepos
const repositories = {
  userRepository,
  transactionsRepository,
  assetsRepository,
};

export type RepositoriesFactories = typeof repositories;
export type Repositories = {
  [K in keyof RepositoriesFactories]: ReturnType<RepositoriesFactories[K]>;
};
export type RepositoriesKeys = keyof Repositories;

export { repositories };
