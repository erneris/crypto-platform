import type { Database } from '@server/database';
import type { User } from '@server/database/types';
import {
  type UserPublic,
  userKeysAll,
  userKeysPublic,
} from '@server/entities/user';
import type { Insertable, Selectable } from 'kysely';

export function userRepository(db: Database) {
  return {
    async create(user: Insertable<User>): Promise<UserPublic> {
      return db
        .insertInto('user')
        .values(user)
        .returning(userKeysPublic)
        .executeTakeFirstOrThrow();
    },

    async findByEmail(email: string): Promise<Selectable<User> | undefined> {
      const user = await db
        .selectFrom('user')
        .select(userKeysAll)
        .where('email', '=', email)
        .executeTakeFirst();

      return user;
    },
    async findById(id: number): Promise<Selectable<User> | undefined> {
      const user = await db
        .selectFrom('user')
        .select(userKeysAll)
        .where('id', '=', id)
        .executeTakeFirst();

      return user;
    },
    async changePassword(password: string, id: number) {
      const user = await db
        .updateTable('user')
        .set({
          password: password,
        })
        .where('id', '=', id)
        .executeTakeFirst();
    },
    async updateMoney(newMoney: number, id: number) {
      const user = await db
        .updateTable('user')
        .set({
          money: newMoney,
        })
        .where('id', '=', id)
        .executeTakeFirst();
    },
  };
}

export type UserRepository = ReturnType<typeof userRepository>;
