const _ = require("lodash");
const db = require("../../models");
const GeneralHelper = require("./generalHelper");

const fileName = "server/helpers/lendingHelper.js";

const getLendingList = async () => {
  let response = {};

  try {
    const result = await db.Lending.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: db.Book,
          as: "Books",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          include: [
            {
              model: db.Category,
              as: "Categories",
              attributes: ["name"],
            },
          ],
        },
        {
          model: db.Customer,
          as: "Customers",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
      ],
    });

    if (result.length === 0) {
      response = { ok: false, message: "Lending list still empty", result };
      return response;
    }

    response = {
      ok: true,
      message: "Retrieving lending list successful!",
      result,
    };
    return response;
  } catch (err) {
    console.log([fileName, "getBlogList", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  getLendingList,
};
