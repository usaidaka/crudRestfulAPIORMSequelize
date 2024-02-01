const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const BookHelper = require("../helpers/bookHelper");
const GeneralHelper = require("../helpers/generalHelper");

const fileName = "server/api/book.js";

const bookList = async (request, reply) => {
  try {
    const response = await BookHelper.getBookList();
    if (!response.ok) {
      return reply.status(404).json(response);
    }
  } catch (err) {
    console.log([fileName, "list", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/book", bookList);

module.exports = Router;
