import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Forum from "./ForumModel.js";

const { DataTypes } = Sequelize;
const Komentar = db.define(
  "Komentar",
  {
    id_komentar: {
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

Forum.hasMany(Komentar), Komentar.belongsTo(Forum, { foreignKey: "id_forum" });

export default Komentar;
