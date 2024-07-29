import { Sequelize } from "sequelize";

const database = new Sequelize(
  "disp2574_db_dispora",
  "disp2574_admin",
  "Manado28@*",
  {
    host: "admin.disporaminsel.com",
    dialect: "mysql",
  }
);

export default database;
