import { Router } from "express";
import { productRoutes } from "./products-routes";
import { tableRoutes } from "./tables-routes";

const routes = Router()

routes.use("/products", productRoutes)
routes.use("/tables", tableRoutes)

export { routes }