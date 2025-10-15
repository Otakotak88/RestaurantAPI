import { Router } from "express";
import { TablesController } from "@/controllers/tables-controllers";

const tableRoutes = Router()
const tablesController = new TablesController()

tableRoutes.get("/", tablesController.index)

export { tableRoutes }