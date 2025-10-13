import { Router } from "express";
import { AppError } from "@/utils/app-error";

const productRoutes = Router()

productRoutes.get("/", (request, response) => {
    const { query } = request   

    response.json({message: "list", query})
})

productRoutes.post("/", (request, response) => {
    const { username, id } = request.body

    response.status(201).json({ username, id })
})


export { productRoutes }