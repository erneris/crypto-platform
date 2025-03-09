import provideRepos from '@server/trpc/provideRepos';
import { userRepository } from '@server/repositories/userRepository';
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure';
import { TRPCError } from '@trpc/server';

export default authenticatedProcedure
  .use(
    provideRepos({
      userRepository,
    })
  )
  .query(async ({ ctx: { authUser, repos } }) => {
    const user = await repos.userRepository.findById(authUser.id);
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unauthenticated. Please log in.',
      });
    }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      money: user.money,
    };
  });
