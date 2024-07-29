import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const BeritaOlahraga = db.define(
  "berita_olahraga",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_pembuat_berita_olahraga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    judul_berita_olahraga: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isi_berita_olahraga: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tanggal_berita_olahraga: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gambar_berita_olahraga: DataTypes.STRING,
    URL: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default BeritaOlahraga;
