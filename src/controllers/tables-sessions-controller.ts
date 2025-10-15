import { Request, Response, NextFunction } from "express"
import { knex } from "@/database/knex"
import { AppError } from "@/utils/app-error"
import { z } from "zod"

export class TablesSessionsController{
    async index(request: Request, response: Response, next: NextFunction){
        try {
            const tablesSessions = await knex<TableSessionsRepository>("tables_sessions")
            .select()
            .orderBy("closed_at")

            return response.json(tablesSessions)
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                table_id: z.number().gt(0)
            })

            const { table_id } = bodySchema.parse(request.body)

            const table = await knex<TableRepository>("tables")
            .where({ id: table_id})
            .first()

            if(!table){
                throw new AppError(`Table with id ${table_id} does not exist`)
            }

            const tableSession = await knex<TableSessionsRepository>("tables_sessions")
            .select()
            .where({ table_id })
            .first()

            if(tableSession){
                throw new AppError("Mesa já está ocupada")
            }

            await knex<TableSessionsRepository>("tables_sessions")
            .insert({ table_id })

            return response.json(table_id)
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction){
        try {
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), { message: "id must be a number" })
            .parse(request.params.id)

            const tableSession = await knex<TableSessionsRepository>("tables_sessions")
            .where({ id })
            .first()

            if (!tableSession){
                throw new AppError(`Sessão não existente`)
            }

            if (tableSession.closed_at){
                throw new AppError(`Sessão já foi fechada`)
            }

            await knex<TableSessionsRepository>("tables_sessions")
            .where({ id })
            .update({ closed_at: knex.fn.now() })

            return response.json({ message: `Sessão com id ${id} fechada com sucesso` })
        } catch (error) {
            next(error)
        }
    }
}