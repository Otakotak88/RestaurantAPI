import { Router } from "express";
import { ProductsController } from "@/controllers/product-controllers";

const productRoutes = Router()
const productsController = new ProductsController()

productRoutes.get("/", productsController.index)
productRoutes.get("/:id", productsController.show)
productRoutes.post("/", productsController.create)
productRoutes.put("/:id", productsController.update)
productRoutes.delete("/:id", productsController.remove)

export { productRoutes }