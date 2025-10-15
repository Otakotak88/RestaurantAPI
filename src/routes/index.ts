import { Router } from "express";
import { productRoutes } from "./products-routes";
import { tableRoutes } from "./tables-routes";
import { tableSessionsRoutes } from "./tables-sessions-routes";

const routes = Router()

routes.use("/products", productRoutes)
routes.use("/tables", tableRoutes)
routes.use("/tables-sessions", tableSessionsRoutes)

export { routes }