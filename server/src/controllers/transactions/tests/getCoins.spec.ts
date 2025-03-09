import { createCallerFactory } from '@server/trpc';
import { wrapInRollbacks } from '@tests/utils/transactions';
import { createTestDatabase } from '@tests/utils/database';
import userRouter from '..';

const createCaller = createCallerFactory(userRouter);
const db = await wrapInRollbacks(createTestDatabase());

const { getCoins } = createCaller({ db });

it('should return coin data', async () => {
  const coinData = await getCoins();
  expect(coinData.length).toBeGreaterThan(10);
});
