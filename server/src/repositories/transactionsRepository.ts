import type { Database } from '@server/database';

export function transactionsRepository(db: Database) {
  return {
    async create(
      userId: number,
      ammount: number,
      asset: string,
      price: number,
      type: string
    ) {
      return db
        .insertInto('transactions')
        .values({
          assetId: asset,
          price: price,
          type: type,
          userId: userId,
          ammount: ammount,
        })
        .executeTakeFirst();
    },
    async getAll(userId: number) {
      const transactions = await db
        .selectFrom('transactions')
        .selectAll()
        .where('userId', '=', userId)
        .execute();
      return transactions;
    },
  };
}

export type TransactionsRepository = ReturnType<typeof transactionsRepository>;
