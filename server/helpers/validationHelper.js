const Joi = require("joi");
const Boom = require("boom");

const addCustomer = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().description("Name; i.e. Usaid Aka"),
    email: Joi.string()
      .required()
      .description("Email; i.e. usaidaka@gmail.com"),
    phone: Joi.string().required().description("Phone; i.e. 089652433206"),
    address: Joi.string()
      .required()
      .description("Address; i.e.Jl TB Simatupang"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const editCustomer = (data) => {
  const schema = Joi.object({
    name: Joi.string().optional().description("Name; i.e. Usaid Aka"),
    phone: Joi.string().optional().description("Phone; i.e. 089652433206  "),
    address: Joi.string()
      .optional()
      .description("Address; i.e.Jl TB Simatupang"),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const addBook = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(20)
      .required()
      .description("name; i.e. Usaid AKA"),
    author: Joi.string()
      .min(3)
      .max(20)
      .required()
      .description("author; i.e. Tere Liye"),
    idCategory: Joi.number()
      .required()
      .description("address; i.e. Jl TB Simatupang"),
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const editBook = (data) => {
  const schema = Joi.object({
    title: Joi.string()
      .min(3)
      .max(20)
      .optional()
      .description("name; i.e. Usaid AKA"),
    author: Joi.string()
      .min(3)
      .max(20)
      .optional()
      .description("author; i.e. Tere Liye"),
    idCategory: Joi.number()
      .optional()
      .description("address; i.e. Jl TB Simatupang"),
  });
  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  addCustomer,
  editCustomer,
  addBook,
  editBook,
};
