import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;
const Suratpemuda = db.define(
  "surat_pemuda",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    nama_surat_pemuda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_surat_pemuda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar_surat_pemuda: {
      type: DataTypes.STRING,
    },
    URL: DataTypes.STRING,
  },
  { freezeTableName: true }
);

export default Suratpemuda;
