import joi from 'joi'

const cakesSchema = joi.object({
  name: joi.string().min(2).required(),
  image: joi.string().uri().required(),
  price: joi.number().min(1).required(),
  description: joi.string().allow('')
})

export default cakesSchema;

