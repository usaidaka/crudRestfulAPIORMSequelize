const _ = require("lodash");
const db = require("../../models");
const GeneralHelper = require("./generalHelper");

const fileName = "server/helpers/customerHelper.js";

const getCustomerList = async () => {
  let response = {};
  try {
    const result = await db.Customer.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });

    if (result.length === 0) {
      response = { ok: false, message: "Customer list still empty", result };
    }

    response = {
      ok: true,
      message: "Retrieving customer list successful",
      result,
    };

    return response;
  } catch (err) {
    console.log([fileName, "getBlogList", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  getCustomerList,
};
