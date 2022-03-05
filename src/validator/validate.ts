import Joi from "joi";
import { Response, NextFunction } from "express";
import Request from "../types/Request";

export default (validator: Joi.ObjectSchema<any>) =>
  async function (req: Request, res: Response, next: NextFunction) {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const validated = await validator.validateAsync(req.body, options);
    req.body = validated;
    next();
  };
