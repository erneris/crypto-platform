import provideRepos from '@server/trpc/provideRepos';
import { userRepository } from '@server/repositories/userRepository';
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure';
import { userSchema } from '@server/entities/user';
import { TRPCError } from '@trpc/server';
import { hash } from 'bcrypt';
import config from '@server/config';

export default authenticatedProcedure
  .use(
    provideRepos({
      userRepository,
    })
  )
  .input(
    userSchema.pick({
      email: true,
      password: true,
    })
  )
  .mutation(async ({ input: user, ctx: { authUser, repos } }) => {
    const userInDatabase = await repos.userRepository.findByEmail(user.email);
    if (!userInDatabase) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'We could not find your account with this email address',
      });
    }

    const passwordHash = await hash(user.password, config.auth.passwordCost);
    repos.userRepository.changePassword(passwordHash, userInDatabase.id);
    return {
      email: user.email,
    };
  });
