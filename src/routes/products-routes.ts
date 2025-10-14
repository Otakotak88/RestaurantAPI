import { Router } from "express";
import { ProductsController } from "@/controllers/product-controllers";

const productRoutes = Router()
const productsController = new ProductsController()

productRoutes.get("/", productsController.index)

productRoutes.post("/", productsController.create)


export { productRoutes }