const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const LendingHelper = require("../helpers/lendingHelper");
const GeneralHelper = require("../helpers/generalHelper");

const fileName = "server/api/lending.js";

const lendingList = async (request, reply) => {
  try {
    const response = await LendingHelper.getLendingList();

    if (!response.ok) {
      return reply.status(404).json(response);
    }

    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "list", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const addLending = async (request, reply) => {
  try {
    const data = request.body;

    const response = await LendingHelper.createLending(data);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "add lending", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const customerLending = async (request, reply) => {
  try {
    const { id } = request.params;

    const response = await LendingHelper.getCustomerLending(id);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "add lending", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const removeLending = async (request, reply) => {
  try {
    const data = request.body;

    const response = await LendingHelper.deleteLending(data);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "remove lending", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/lending", lendingList);
Router.get("/lending/:id", customerLending);
Router.post("/lending", addLending);
Router.delete("/lending", removeLending);

module.exports = Router;
