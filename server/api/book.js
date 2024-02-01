const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const BookHelper = require("../helpers/bookHelper");
const GeneralHelper = require("../helpers/generalHelper");

const fileName = "server/api/book.js";

const bookList = async (request, reply) => {
  try {
    const { title } = request.query;
    const response = await BookHelper.getBookList(title);
    if (!response.ok) {
      return reply.status(404).json(response);
    }

    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "book list", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const bookDetail = async (request, reply) => {
  try {
    const { id } = request.params;

    const response = await BookHelper.getBookDetail(id);
    if (!response.ok) {
      return reply.status(404).json(response);
    }
    return reply.status(200).json(response);
  } catch (err) {
    console.log([fileName, "book detail", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const addBook = async (request, reply) => {
  try {
    const data = request.body;

    Validation.addBook(data);

    const response = await BookHelper.createBook(data);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(201).json(response);
  } catch (err) {
    console.log([fileName, "add book", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const editBook = async (request, reply) => {
  try {
    const data = request.body;
    const { id } = request.params;

    Validation.editBook(data);

    const response = await BookHelper.patchBook(id, data);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(201).json(response);
  } catch (err) {
    console.log([fileName, "edit customer", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const removeBook = async (request, reply) => {
  try {
    const { id } = request.params;

    const response = await BookHelper.deleteBook(id);

    if (!response.ok) {
      return reply.status(400).json(response);
    }

    return reply.status(202).json(response);
  } catch (err) {
    console.log([fileName, "remove custodmer", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/book", bookList);
Router.get("/book/:id", bookDetail);
Router.post("/book", addBook);
Router.patch("/book/:id", editBook);
Router.delete("/book/:id", removeBook);

module.exports = Router;
