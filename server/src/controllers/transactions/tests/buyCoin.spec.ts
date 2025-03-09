import { createCallerFactory } from '@server/trpc';
import { wrapInRollbacks } from '@tests/utils/transactions';
import { createTestDatabase } from '@tests/utils/database';
import { insertAll } from '@tests/utils/records';
import { fakeUser } from '@server/entities/tests/fakes';
import { requestContext } from '@tests/utils/context';
import userRouter from '..';

const createCaller = createCallerFactory(userRouter);
const db = await wrapInRollbacks(createTestDatabase());
const VALID_TOKEN = '123';

const [userSeed] = await insertAll(db, 'user', [
  fakeUser({
    email: 'existing@user.com',
    password: '$2b$10$sD53fzWIQBjXWfSDzuwmMOyY1ZAygLpRZlLxxPhcNG5r9BFWrNaDC', //correct password.123
    money: 1000,
    firstName: 'first',
    lastName: 'last',
  }),
]);

vi.mock('jsonwebtoken', () => ({
  default: {
    verify: (token: string) => {
      if (token !== VALID_TOKEN) throw new Error('Invalid token');
      return { user: { id: userSeed.id, email: userSeed.email } };
    },
  },
}));

const authenticated = createCaller(
  requestContext({
    db,
    req: {
      header: () => `Bearer ${VALID_TOKEN}`,
    } as any,
  })
);

const { buyCoin } = createCaller({ db } as any);

it('should not allow to buy if user is not logged in', async () => {
  await expect(
    buyCoin({
      ammount: 1,
      symbol: 'btc',
    })
  ).rejects.toThrow();
});

it('should not allow to buy if user does not have enough money', async () => {
  await expect(
    authenticated.buyCoin({
      ammount: 1,
      symbol: 'btc',
    })
  ).rejects.toThrow(/enough/);
});

it('should not allow to buy a non-existent coin', async () => {
  await expect(
    authenticated.buyCoin({
      ammount: 1,
      symbol: 'btcfdafaw',
    })
  ).rejects.toThrow(/No coins with this symbol was/);
});

it('should not allow to buy a too small ammount', async () => {
  await expect(
    authenticated.buyCoin({
      ammount: 0.00001,
      symbol: 'btc',
    })
  ).rejects.toThrow(/multiple/);
});

it('should not allow to buy a negative ammount', async () => {
  await expect(
    authenticated.buyCoin({
      ammount: -1,
      symbol: 'btc',
    })
  ).rejects.toThrow(/greater than 0/);
});

it('should allow to buy same cryptocurrency a couple of times', async () => {
  expect(
    await authenticated.buyCoin({
      ammount: 0.001,
      symbol: 'btc',
    })
  );
  expect(
    await authenticated.buyCoin({
      ammount: 0.001,
      symbol: 'btc',
    })
  );
});
