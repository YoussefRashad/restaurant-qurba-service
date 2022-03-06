import Joi from "joi";

const deleteValidator = Joi.object({
  user_id: Joi.string().required(),
  code: Joi.string().required()
});

export default deleteValidator;