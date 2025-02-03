import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Galeri = db.define(
  "galeri",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar: DataTypes.STRING,
    URL: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Galeri;
