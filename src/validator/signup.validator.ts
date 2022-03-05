import Joi from "joi";

const signupValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/[a-zA-Z0-9]{6,30}/)
    .required(),
  username: Joi.string().required(),
  phoneNumber: Joi.string().required(),
});

export default signupValidator;
