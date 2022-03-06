import Joi from "joi";

const GetValidator = Joi.object({
  code: Joi.string().required()
});

export default GetValidator;