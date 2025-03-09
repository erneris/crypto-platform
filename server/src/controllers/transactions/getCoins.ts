import provideRepos from '@server/trpc/provideRepos';
import { transactionsRepository } from '@server/repositories/transactionsRepository';
import { publicProcedure } from '@server/trpc';
import { getCoins } from './apiCalls';
import { TRPCError } from '@trpc/server';

export default publicProcedure
  .use(
    provideRepos({
      transactionsRepository,
    })
  )
  .query(async () => {
    try {
      const res = await getCoins();
      return res;
    } catch (e) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: String(e),
      });
    }
  });
