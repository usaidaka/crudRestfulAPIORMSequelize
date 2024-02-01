const _ = require("lodash");
const db = require("../../models");

const getCustomerList = async () => {
  const result = await db.Customer.findAll({});
  console.log(result);
  return result;
};

module.exports = {
  getCustomerList,
};
