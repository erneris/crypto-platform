import provideRepos from '@server/trpc/provideRepos';
import { userRepository } from '@server/repositories/userRepository';
import { transactionsRepository } from '@server/repositories/transactionsRepository';
import { assetsRepository } from '@server/repositories/assetsRepository';
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure';
import { cryptoSymbolWithAmmount } from '@server/entities/transactions';
import { getCoinBySymbol } from './apiCalls';
import { TRPCError } from '@trpc/server';

export default authenticatedProcedure
  .use(
    provideRepos({
      transactionsRepository,
      userRepository,
      assetsRepository,
    })
  )
  .input(
    cryptoSymbolWithAmmount.pick({
      symbol: true,
      ammount: true,
    })
  )

  .mutation(
    async ({ input: { ammount, symbol }, ctx: { authUser, repos } }) => {
      const user = await repos.userRepository.findById(authUser.id);
      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthenticated. Please log in.',
        });
      }
      let coin;
      try {
        coin = await getCoinBySymbol(symbol);
      } catch (e) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: String(e),
        });
      }

      const price = Math.round(coin.quotes.USD.price * ammount * 100) / 100;

      const asset = await repos.assetsRepository.getSpecific(user.id, symbol);
      if (!asset) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `User doesn't own the specified coin.`,
        });
      } else {
        if (Number(asset.ammount) < ammount) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `User doesn't own enough specified coin.`,
          });
        }
        await repos.transactionsRepository.create(
          user.id,
          ammount,
          symbol,
          price,
          'sell'
        );
        await repos.assetsRepository.changeAmmount(
          asset.id,
          Number(asset.ammount) - ammount
        );
      }

      const newMoney = Math.round((Number(user.money) + price) * 100) / 100;
      await repos.userRepository.updateMoney(newMoney, user.id);
      return newMoney;
    }
  );
