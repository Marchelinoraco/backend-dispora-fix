import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Berita = db.define(
  "berita",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_pembuat_berita: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    judul_berita: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isi_berita: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tanggal_berita: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gambar: DataTypes.STRING,
    URL: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default Berita;
