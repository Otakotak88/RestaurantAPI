import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("tables_sessions", (session) => {
        session.increments("id").primary,
        session.integer("table_id").notNullable().references("id").inTable("tables"),
        session.timestamp("opened_at").defaultTo(knex.fn.now()),
        session.time("closed_at")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("tables_sessions")
}

