import { Sequelize } from "sequelize";

// Load environment variables
import dotenv from "dotenv";
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "mysql",
    logging: false as boolean,
    dialectModule: require("mysql2"),
  }
);

export default sequelize;
