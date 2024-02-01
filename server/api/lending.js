const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const LendingHelper = require("../helpers/lendingHelper");
const GeneralHelper = require("../helpers/generalHelper");

const fileName = "server/api/lending.js";

const lendingList = async (request, reply) => {
  try {
    Validation.pokemonListValidation(request.query);

    const response = await LendingHelper.getLendingList();

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "list", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/lending", lendingList);

module.exports = Router;
