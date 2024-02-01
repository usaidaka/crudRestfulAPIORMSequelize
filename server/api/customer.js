const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const CustomerHelper = require("../helpers/customerHelper");
const GeneralHelper = require("../helpers/generalHelper");

const fileName = "server/api/customer.js";

const customerList = async (request, reply) => {
  try {
    Validation.pokemonListValidation(request.query);

    const response = await CustomerHelper.getCustomerList();

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "list", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/customer", customerList);

module.exports = Router;
