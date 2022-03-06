import Joi from "joi";

const SearchValidator = Joi.object({
  query: Joi.string().required()
});

export default SearchValidator;