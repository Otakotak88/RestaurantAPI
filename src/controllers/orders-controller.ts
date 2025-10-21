import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/app-error";
import { z } from "zod";

export class OrdersController{
    async create(request: Request, response: Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                table_session_id: z.number().gt(0),
                product_id: z.number().gt(0),
                quantity: z.number().gt(0)
            })
            const { table_session_id, product_id, quantity } = bodySchema.parse(request.body)

            const session = await knex<TableSessionsRepository>("tables_sessions")
            .where({ id: table_session_id })
            .first()

            if (!session){
                throw new AppError("Table session not found")
            }

            if (session.closed_at){
                throw new AppError("Table session already closed")
            }

            const product = await knex<ProductRepository>("products")
            .where({ id: product_id })
            .first()

            if (!product){
                throw new AppError("Product not found")
            }

            await knex<OrdersRepository>("orders")
            .insert({
                table_session_id,
                product_id,
                quantity,
                price: product.price
            })

            return response.status(201).json({ message: "Pedido criado com sucesso" })
        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction){
        try {
            const table_session_id = z
            .string()
            .transform(value => Number(value))
            .refine(value => !isNaN(value))
            .parse(request.params.table_session_id)

            const orders = await knex<OrdersRepository>("orders")
            .select(
                "orders.id",
                "orders.table_session_id",
                "orders.product_id",
                "products.name",
                "orders.price",
                "orders.quantity",
                knex.raw("orders.price * orders.quantity AS total"),
                "orders.created_at"
            )
            .join("products", "products.id", "orders.product_id")
            .where({ table_session_id })

            return response.json(orders)
        } catch (error) {
            next(error)
        }
    }

    async show(request: Request, response: Response, next: NextFunction){
        try {
            const table_session_id = Number(request.params.table_session_id)

            const order = await knex<OrdersRepository>("orders")
            .select(
                knex.raw("COALESCE(SUM(orders.price * orders.quantity), 0) AS total"),
                knex.raw("COALESCE(SUM(orders.quantity), 0) AS quantity")
            )
            .where({ table_session_id })
            .first()


            return response.json(order)
        } catch (error) {
            next(error)
        }
    }
}