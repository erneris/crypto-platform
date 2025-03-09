import provideRepos from '@server/trpc/provideRepos';
import { transactionsRepository } from '@server/repositories/transactionsRepository';
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure';

export default authenticatedProcedure
  .use(
    provideRepos({
      transactionsRepository,
    })
  )
  .query(async ({ ctx: { authUser, repos } }) => {
    const transactions = await repos.transactionsRepository.getAll(authUser.id);

    return {
      transactions,
    };
  });
