import { query } from 'express'
import { connection } from '../db/database.js'
import clientsSchema from '../schemas/clientsSchemas.js'

async function postClients(req, res) {
  const { name, address, phone } = req.body

  const validClient = clientsSchema.validate({ name, address, phone })

  if (validClient.error) {
    return res.send(400)
  }

  try {
    await connection.query(
      'INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);',
      [name, address, phone]
    )

    return res.send(201)
  } catch (error) {
    return res.send(500)
  }
}

async function getClientsOrders(req, res) {
  const clientId = req.params

  try {
    const clientExist = await connection.query(
      'SELECT id FROM clients WHERE id = $1',
      [clientId.id]
    )

    const clientOrders = await connection.query(
      `SELECT orders.id AS "orderId", orders.quantity AS quantity, to_char(orders."createdAt", 'YYYY-MM-DD HH24:MI') AS "createdAt", orders."totalPrice" AS "totalPrice", cakes.name AS "cakeName" FROM orders JOIN cakes ON orders."cakeId" = cakes.id WHERE orders."clientId" = $1`,
      [clientId.id]
    )

    if (clientExist.rows.length === 0) {
      return res.send(404)
    }

    return res.send(200, clientOrders.rows)
  } catch {
    return res.send(500)
  }
}

export { postClients, getClientsOrders }
