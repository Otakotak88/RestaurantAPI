import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex"; 
import { z, ZodError } from "zod"

export class ProductsController{
    async index (request: Request, response: Response, next: NextFunction){
        try {
            const { name } = request.query
        
            const products = await knex("products")
            .select()
            .whereLike("name", `%${name ?? ""}%`)
            .orderBy("name")

            response.json( products )
        } catch (error) {
            next(error)
        }
    }

    async create (request: Request, response: Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0),
            })

            const { name, price } = bodySchema.parse(request.body)

            await knex<ProductRepository>("products").insert({ name, price })

            return response.status(201).json("deu serto")
        } catch (error) {
            next(error)
        }
    }

    async update (request: Request, response: Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0),
            })

            const { name, price } = bodySchema.parse(request.body)
            const id = z
            .string()
            .transform(value => Number(value))
            .refine((value) => !isNaN(value), { message: "id must be a number"})
            .parse(request.params.id)

            const product = await knex<ProductRepository>("products").where("id", id).update({ name, price, updated_at: knex.fn.now() })

            return response.json({ message: "Atualização realizada com sucesso" })
        } catch (error) {
            next(error)
        }
    }
}