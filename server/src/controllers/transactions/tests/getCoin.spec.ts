import { createCallerFactory } from '@server/trpc';
import { wrapInRollbacks } from '@tests/utils/transactions';
import { createTestDatabase } from '@tests/utils/database';
import userRouter from '..';

const createCaller = createCallerFactory(userRouter);
const db = await wrapInRollbacks(createTestDatabase());

const { getCoin } = createCaller({ db });

it('should return coin data', async () => {
  const coinData = await getCoin({
    symbol: 'btc',
  });
  expect(coinData.symbol).toEqual('BTC');
});

it('throws an error for invalid coin', async () => {
  await expect(
    getCoin({
      symbol: 'not-a-coin',
    })
  ).rejects.toThrow(/symbol/);
});
