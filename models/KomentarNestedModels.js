import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Forum from "./ForumModel.js";
import Komentar from "./KomentarModel.js";

const { DataTypes } = Sequelize;
const Komentar_Nested = db.define(
  "Komentar_Nested",
  {
    id_komentar_nested: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_forum: {
      type: DataTypes.INTEGER,
    },

    UserId: {
      type: DataTypes.INTEGER,
    },
    nama_pembuat_komentar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    isi_komentar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { freezeTableName: true }
);

Komentar_Nested.hasMany(Komentar_Nested),
  Komentar_Nested.belongsTo(Komentar, { foreignKey: "id_komentar" });

export default Komentar_Nested;
