import { type Kysely } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', c => c.primaryKey().generatedAlwaysAsIdentity())
    .addColumn('first_name', 'text', column => column.notNull())
    .addColumn('last_name', 'text', column => column.notNull())
    .addColumn('email', 'text', column => column.notNull().unique())
    .addColumn('money', 'float8', column => column.notNull())
    .addColumn('password', 'text', c => c.notNull())
    .execute();
}

export async function down(db: Kysely<any>) {}
