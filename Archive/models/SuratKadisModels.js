import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Suratkadis = db.define(
  "surat_kadis",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_surat_kadis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_surat_kadis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar_surat_kadis: {
      type: DataTypes.STRING,
    },
    URL: DataTypes.STRING,
  },
  { freezeTableName: true }
);

export default Suratkadis;
