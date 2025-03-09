import type { Database } from '@server/database';

export function assetsRepository(db: Database) {
  return {
    async getAll(userId: number) {
      const assets = await db
        .selectFrom('assets')
        .selectAll()
        .where('userId', '=', userId)
        .execute();
      return assets;
    },
    async getSpecific(userId: number, symbol: string) {
      const assets = await db
        .selectFrom('assets')
        .selectAll()
        .where(eb => eb('userId', '=', userId).and('assetId', '=', symbol))
        .executeTakeFirst();
      return assets;
    },
    async changeAmmount(id: number, ammount: number) {
      await db
        .updateTable('assets')
        .set({
          ammount: Math.round(ammount * 10000) / 10000,
        })
        .where('id', '=', id)
        .execute();
    },
    async create(userId: number, ammount: number, symbol: string) {
      return db
        .insertInto('assets')
        .values({
          userId: userId,
          ammount: Math.round(ammount * 10000) / 10000,
          assetId: symbol,
        })
        .executeTakeFirst();
    },
  };
}

export type AssetsRepository = ReturnType<typeof assetsRepository>;
