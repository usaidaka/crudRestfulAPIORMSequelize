const _ = require("lodash");
const db = require("../../models");
const isExist = require("../../utils/isExist");
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
      return response;
    }

    response = {
      ok: true,
      message: "Retrieving customer list successful",
      result,
    };

    return response;
  } catch (err) {
    console.log([fileName, "get customer list", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getCustomerDetail = async (id) => {
  let response = {};
  try {
    const result = await db.Customer.findByPk(id, {
      attributes: { exclude: ["deletedAt", "createdAt", "updatedAt"] },
    });

    if (!result) {
      response = { ok: false, message: "Customer Not Found", result };
      return response;
    }
    response = {
      ok: true,
      message: `Retrieving customer: "${result.name} " detail successful`,
      result,
    };

    return response;
  } catch (err) {
    console.log([fileName, "get customer detail", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const createCustomer = async (data) => {
  let response = {};
  const transaction = await db.sequelize.transaction();
  try {
    const { name, phone, address } = data;

    const isDataExist = await isExist.isCustomerExist(data);

    if (!isDataExist.ok) {
      response = {
        ok: isDataExist.ok,
        message: isDataExist.message,
      };
      await transaction.rollback();
      return response;
    }

    const result = await db.Customer.create(
      { name, phone, address },
      { transaction }
    );

    response = {
      ok: true,
      message: `Customer: ${name} successfully created!`,
      result,
    };

    await transaction.commit();
    return response;
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "create customer", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const patchCustomer = async (id, data) => {
  let response = {};

  const transaction = await db.sequelize.transaction();
  try {
    const { name, phone, address } = data;
    const isCustomerExist = await getCustomerDetail(id);

    if (!isCustomerExist.ok) {
      response = {
        ok: false,
        message: "Customer Not Found",
      };
      await transaction.rollback();
      return response;
    }

    const isDataExist = await isExist.isCustomerExist(data);

    if (!isDataExist.ok) {
      response = {
        ok: isDataExist.ok,
        message: isDataExist.message,
      };
      await transaction.rollback();
      return response;
    }

    const result = await db.Customer.update(
      { name, phone, address },
      { where: { id } },
      { transaction }
    );

    if (!result) {
      response = {
        ok: false,
        message: "Edit customer failed!",
      };
      await transaction.rollback();
      return response;
    }

    response = {
      ok: true,
      message: `Congrats! Customer : ${isCustomerExist.result?.name}'s data successfully updated `,
      result: data,
    };
    await transaction.commit();
    return response;
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "patch customer", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const deleteCustomer = async (id) => {
  let response = {};

  const transaction = await db.sequelize.transaction();
  try {
    const isCustomerExist = await getCustomerDetail(id);

    if (!isCustomerExist.ok) {
      response = {
        ok: false,
        message: "Customer Not Found",
      };
      await transaction.rollback();
      return response;
    }

    await db.Customer.destroy({ where: { id } }, { transaction });

    response = {
      ok: true,
      message: `Customer: ${isCustomerExist.result?.name}'s data successfully deleted!`,
      result: isCustomerExist.result,
    };

    await transaction.commit();
    return response;
  } catch (err) {
    await transaction.rollback();
    console.log([fileName, "delete customer", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  getCustomerList,
  createCustomer,
  getCustomerDetail,
  patchCustomer,
  deleteCustomer,
};
