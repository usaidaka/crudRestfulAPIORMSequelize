const _ = require("lodash");
const db = require("../../models");

const getLendingList = async () => {
  const result = await db.Lending.findAll({});
  console.log(result);
  return result;
};

module.exports = {
  getLendingList,
};
