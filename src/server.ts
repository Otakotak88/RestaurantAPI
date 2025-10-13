import express from "express"
import { routes } from "./routes"
import { errorHandler } from "./middlewares/error-handler"

const PORT = 3333
const app = express()

app.use(express.json())

app.use(routes)

app.use(errorHandler)

app.listen(PORT, () => { console.log(`Server is listening to port ${PORT}`) })