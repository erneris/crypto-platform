import provideRepos from '@server/trpc/provideRepos';
import { transactionsRepository } from '@server/repositories/transactionsRepository';
import { publicProcedure } from '@server/trpc';
import { cryptoSymbol } from '@server/entities/transactions';
import { getCoinBySymbol } from './apiCalls';
import { TRPCError } from '@trpc/server';

export default publicProcedure
  .use(
    provideRepos({
      transactionsRepository,
    })
  )
  .input(
    cryptoSymbol.pick({
      symbol: true,
    })
  )
  .query(async ({ input: { symbol } }) => {
    try {
      const res = await getCoinBySymbol(symbol);
      return res;
    } catch (e) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: String(e),
      });
    }
  });
