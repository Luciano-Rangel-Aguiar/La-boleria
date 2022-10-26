import cors from 'cors'
import { connection } from './db/database.js'
import dotenv from 'dotenv'
import express from 'express'
import cakeRouter from './routes/cakesRouter.js'
import clientRouter from './routes/clientsRouter.js'
import orderRouter from './routes/ordersRouters.js'

dotenv.config()
const server = express()

server.use(cors())
server.use(express.json())

server.use(cakeRouter)
server.use(clientRouter)
server.use(orderRouter)

server.listen(process.env.PORT, () => {
  console.log(`listen on port ${process.env.PORT}`)
})
