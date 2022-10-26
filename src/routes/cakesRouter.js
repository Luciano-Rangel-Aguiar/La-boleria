import express  from "express";
import postCakes from '../controllers/cakesControllers.js'

const cakeRouter = express.Router()

cakeRouter.post('/cakes',  postCakes)

export default cakeRouter