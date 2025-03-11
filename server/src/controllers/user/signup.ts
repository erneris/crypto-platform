import { hash } from 'bcrypt';
import { publicProcedure } from '@server/trpc';
import config from '@server/config';
import { TRPCError } from '@trpc/server';
import provideRepos from '@server/trpc/provideRepos';
import { userRepository } from '@server/repositories/userRepository';
import { assertError } from '@server/utils/errors';
import { userSchema } from '@server/entities/user';
import jsonwebtoken from 'jsonwebtoken';
const { expiresIn, tokenKey } = config.auth;

export default publicProcedure
  .use(provideRepos({ userRepository }))
  .input(
    userSchema.pick({
      email: true,
      password: true,
      firstName: true,
      lastName: true,
      money: true,
    })
  )
  .mutation(async ({ input: user, ctx: { repos } }) => {
    const passwordHash = await hash(user.password, config.auth.passwordCost);
    const userCreated = await repos.userRepository
      .create({ ...user, password: passwordHash })
      .catch((error: unknown) => {
        assertError(error);
        if (error.message.includes('duplicate key')) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User with this email already exists',
            cause: error,
          });
        }

        throw error;
      });

    const payload = { user: { id: userCreated.id } };
    // @ts-expect-error
    const token = jsonwebtoken.sign(payload, tokenKey, {
      expiresIn: expiresIn,
    });
    return { id: userCreated.id, token };
  });
