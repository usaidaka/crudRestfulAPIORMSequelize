const _ = require("lodash");
const db = require("../../models");
const GeneralHelper = require("./generalHelper");

const fileName = "server/helpers/bookHelper.js";

const getBookList = async () => {
  let response = {};
  try {
    const result = await db.Book.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: db.Category,
          as: "Categories",
          attributes: ["name"],
        },
      ],
    });

    if (result.length === 0) {
      response = { ok: false, message: "Book list still empty", result };
      return response;
    }

    response = {
      ok: true,
      message: "Retrieving book list successful!",
      result,
    };
    return response;
  } catch (err) {
    console.log([fileName, "getBlogList", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  getBookList,
};
