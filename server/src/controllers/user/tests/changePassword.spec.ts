import { createCallerFactory } from '@server/trpc';
import { wrapInRollbacks } from '@tests/utils/transactions';
import { createTestDatabase } from '@tests/utils/database';
import { insertAll } from '@tests/utils/records';
import { fakeUser } from '@server/entities/tests/fakes';
import userRouter from '..';
import { requestContext } from '@tests/utils/context';

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

it('should not change password if user is not logged in', async () => {
  const { changePassword } = createCaller({ db } as any);
  await expect(
    changePassword({
      email: userSeed.email,
      password: '12345678',
    })
  ).rejects.toThrow();
});

it('should not allow to change password if it is shorter than 8 characters', async () => {
  await expect(
    authenticated.changePassword({
      email: userSeed.email,
      password: '1',
    })
  ).rejects.toThrow(/at least 8 characters/);
});

it('returns data if user is logged in', async () => {
  await authenticated.changePassword({
    email: userSeed.email,
    password: '12345678',
  });
});

it('should not allow to change password if email does not exist', async () => {
  await expect(
    authenticated.changePassword({
      email: 'random',
      password: '12345678',
    })
  ).rejects.toThrow(/Invalid email/);
});
