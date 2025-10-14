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
}