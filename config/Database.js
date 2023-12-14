import { Sequelize } from "sequelize";

const database = new Sequelize("db_dispora", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default database;
