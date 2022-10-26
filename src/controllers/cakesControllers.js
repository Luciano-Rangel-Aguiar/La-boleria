import { connection } from '../db/database.js'
import cakesSchema from '../schemas/cakesSchema.js'

async function postCakes(req, res) {
  const { name, price, image, description } = req.body

  const validCake = cakesSchema.validate({ name, price, image, description })

  if (validCake.error) {
    if (
      validCake.error.message == '"image" is not allowed to be empty' ||
      validCake.error.message == '"image" must be a valid uri'
    ) {
      return res.send(422)
    }

    return res.send(400)
  }

  try {
    const findName = await connection.query(
      'SELECT name FROM cakes WHERE name = $1',
      [name]
    )

    if (findName.rows.length > 0) {
      return res.send(409)
    }

    await connection.query(
      'INSERT INTO cakes (name, price, image, description) VALUES ($1, $2, $3, $4);',
      [name, price, image, description]
    )
    return res.send(201)
  } catch (error) {
    return res.send(500, 'the cake is a lie')
  }
}

export default postCakes
