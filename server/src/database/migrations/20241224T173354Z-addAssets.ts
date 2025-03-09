import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('assets')
    .addColumn('id', 'integer', c => c.primaryKey().generatedAlwaysAsIdentity())
    .addColumn('user_id', 'integer', column =>
      column.notNull().references('user.id')
    )
    .addColumn('asset_id', 'text', column => column.notNull())
    .addColumn('ammount', 'decimal', column => column.notNull())
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('assets').execute();
}
