import Joi from "joi";

const createValidator = Joi.object({
  user_id: Joi.string().required(),
  code: Joi.string().required(),
  name: Joi.string().required(),
  age: Joi.number().required(),
  location: Joi.string().required(),
  website: Joi.string().required()
});

export default createValidator;