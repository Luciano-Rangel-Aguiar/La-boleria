import express from "express";
import {postClients, getClientsOrders} from "../controllers/clientsControllers.js"

const clientRouter = express.Router()

clientRouter.post('/clients',  postClients)
clientRouter.get('/clients/:id/orders', getClientsOrders)

export default clientRouter