import { createCallerFactory } from '@server/trpc';
import { wrapInRollbacks } from '@tests/utils/transactions';
import { createTestDatabase } from '@tests/utils/database';
import { insertAll } from '@tests/utils/records';
import { fakeUser } from '@server/entities/tests/fakes';
import userRouter from '..';
import { requestContext } from '@tests/utils/context';

const createCaller = createCallerFactory(userRouter);
const db = await wrapInRollbacks(createTestDatabase());
const PASSWORD_CORRECT = 'password.123';
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

const { getData } = createCaller({ db } as any);

it('should not give data if user is not logged in', async () => {
  await expect(getData()).rejects.toThrow();
});

it('returns data if user is logged in', async () => {
  const authenticated = createCaller(
    requestContext({
      db,
      req: {
        header: () => `Bearer ${VALID_TOKEN}`,
      } as any,
    })
  );

  const data = await authenticated.getData();
  expect(data).toStrictEqual({
    firstName: userSeed.firstName,
    lastName: userSeed.lastName,
    money: userSeed.money,
    email: userSeed.email,
  });
});
