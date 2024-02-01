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
    console.log([fileName, "customer list", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const customerDetail = async (request, reply) => {
  try {
    const { id } = request.params;

    const response = await CustomerHelper.getCustomerDetail(id);
    if (!response.ok) {
      return reply.status(404).json(response);
    }
    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "customer detail", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const addCustomer = async (request, reply) => {
  try {
    const data = request.body;

    Validation.addCustomer(data);

    const response = await CustomerHelper.createCustomer(data);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(201).json(response);
  } catch (err) {
    console.log([fileName, "add customer", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const editCustomer = async (request, reply) => {
  try {
    const data = request.body;
    const { id } = request.params;

    Validation.editCustomer(data);

    const response = await CustomerHelper.patchCustomer(id, data);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(201).json(response);
  } catch (err) {
    console.log([fileName, "edit customer", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const removeCustomer = async (request, reply) => {
  try {
    const { id } = request.params;

    const response = await CustomerHelper.deleteCustomer(id);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(202).json(response);
  } catch (err) {
    console.log([fileName, "remove custodmer", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/customer", customerList);
Router.get("/customer/:id", customerDetail);
Router.post("/customer", addCustomer);
Router.patch("/customer/:id", editCustomer);
Router.delete("/customer/:id", removeCustomer);

module.exports = Router;
