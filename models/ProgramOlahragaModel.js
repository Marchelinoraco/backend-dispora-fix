import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const ProgramOlahraga = db.define(
  "program_olahraga",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_pembuat_program_olahraga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kontak_admin_program_olahraga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_program_olahraga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar_program_olahraga: {
      type: DataTypes.STRING,
    },
    URL: DataTypes.STRING,
  },
  { freezeTableName: true }
);

export default ProgramOlahraga;
