import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Program = db.define(
  "program_pemuda",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_pembuat_program: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kontak_admin_program: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_program: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar_program: {
      type: DataTypes.STRING,
    },
    URL: DataTypes.STRING,
  },
  { freezeTableName: true }
);

export default Program;
