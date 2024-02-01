const _ = require("lodash");
const db = require("../../models");

const getBookList = async () => {
  const result = await db.Book.findAll({});
  console.log(result);
  return result;
};

module.exports = {
  getBookList,
};
