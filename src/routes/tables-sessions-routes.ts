import { Router } from "express"; 
import { TablesSessionsController } from "@/controllers/tables-sessions-controller";

const tableSessionsRoutes = Router()
const tablesSessionsController = new TablesSessionsController()

tableSessionsRoutes.get("/", tablesSessionsController.index)
tableSessionsRoutes.post("/", tablesSessionsController.create)
tableSessionsRoutes.patch("/:id", tablesSessionsController.update)

export { tableSessionsRoutes }