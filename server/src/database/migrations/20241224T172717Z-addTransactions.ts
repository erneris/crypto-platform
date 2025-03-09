import type { Kysely } from 'kysely';
import { sql } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('transactions')
    .addColumn('id', 'integer', c => c.primaryKey().generatedAlwaysAsIdentity())
    .addColumn('user_id', 'integer', column =>
      column.notNull().references('user.id')
    )
    .addColumn('asset_id', 'text', column => column.notNull())
    .addColumn('ammount', 'decimal', column => column.notNull())
    .addColumn('price', 'decimal', column => column.notNull())
    .addColumn('made_at', 'text', col =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('type', 'text', c => c.notNull())
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('transactions').execute();
}
