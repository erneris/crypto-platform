import { router } from '../trpc';
import user from './user';
import transactions from './transactions';

export const appRouter = router({
  user,
  transactions,
});

export type AppRouter = typeof appRouter;
