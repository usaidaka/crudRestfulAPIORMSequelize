const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const CustomerHelper = require("../helpers/customerHelper");
const GeneralHelper = require("../helpers/generalHelper");

const fileName = "server/api/customer.js";

const customerList = async (request, reply) => {
  try {
    const response = await CustomerHelper.getCustomerList();

    if (!response.ok) {
      return reply.status(404).json(response);
    }

    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "list", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/customer", customerList);

module.exports = Router;
