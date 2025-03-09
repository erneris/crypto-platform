import provideRepos from '@server/trpc/provideRepos';
import { assetsRepository } from '@server/repositories/assetsRepository';
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure';

export default authenticatedProcedure
  .use(
    provideRepos({
      assetsRepository,
    })
  )
  .query(async ({ ctx: { authUser, repos } }) => {
    const assets = await repos.assetsRepository.getAll(authUser.id);
    return {
      assets,
    };
  });
