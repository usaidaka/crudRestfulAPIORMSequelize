require("dotenv").config({ path: `../.env` });

console.log(process.env.MYSQL_CONFIG_USER, "config_user");

module.exports = {
  development: {
    username: process.env.MYSQL_CONFIG_USER,
    password: process.env.MYSQL_CONFIG_PASSWORD,
    database: process.MYSQL_CONFIG_DATABASE,
    host: process.env.MYSQL_CONFIG_HOST,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.MYSQL_CONFIG_USER,
    password: process.env.MYSQL_CONFIG_PASSWORD,
    database: process.MYSQL_CONFIG_DATABASE,
    host: process.env.MYSQL_CONFIG_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.MYSQL_CONFIG_USER,
    password: process.env.MYSQL_CONFIG_PASSWORD,
    database: process.MYSQL_CONFIG_DATABASE,
    host: process.env.MYSQL_CONFIG_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
