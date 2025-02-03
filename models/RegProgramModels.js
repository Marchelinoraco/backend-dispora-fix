import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Program from "./ProgramPemudaModels.js";

const { DataTypes } = Sequelize;
const RegProgram = db.define(
  "TabelRegProgram",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_reg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    umur_reg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tempat_tanggal_lahir: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    no_telepon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nim: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    IPK: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kecamatan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    desa: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    universitas: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fakultas: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jurusan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    wisuda: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    yudisium: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    semester_s1: {
      type: DataTypes.STRING,
    },
    semester_s2: {
      type: DataTypes.STRING,
    },
    semester_s3: {
      type: DataTypes.STRING,
    },
    semester_diploma: {
      type: DataTypes.STRING,
    },
    gambar_ktp: {
      type: DataTypes.STRING,
    },
    gambar_khs: {
      type: DataTypes.STRING,
    },
    gambar_spbupati: {
      type: DataTypes.STRING,
    },
    gambar_biodatareg: {
      type: DataTypes.STRING,
    },
    gambar_pasfoto: {
      type: DataTypes.STRING,
    },
    gambar_belumbea: {
      type: DataTypes.STRING,
    },
    gambar_databpp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gambar_ketpimpinan: {
      type: DataTypes.STRING,
    },
    gambar_kartumahasiswa: {
      type: DataTypes.STRING,
    },
    gambar_kk: {
      type: DataTypes.STRING,
    },
    gambar_proposalakhir: {
      type: DataTypes.STRING,
    },
    URL_ktp: {
      type: DataTypes.STRING,
    },
    URL_khs: {
      type: DataTypes.STRING,
    },
    URL_spbupati: {
      type: DataTypes.STRING,
    },
    URL_biodatareg: {
      type: DataTypes.STRING,
    },
    URL_pasfoto: {
      type: DataTypes.STRING,
    },
    URL_belumbea: {
      type: DataTypes.STRING,
    },
    URL_databpp: {
      type: DataTypes.STRING,
    },
    URL_ketpimpinan: {
      type: DataTypes.STRING,
    },
    URL_kartumahasiswa: {
      type: DataTypes.STRING,
    },
    URL_kk: {
      type: DataTypes.STRING,
    },
    URL_proposalakhir: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

Program.hasMany(RegProgram);
RegProgram.belongsTo(Program, { foreignKey: "id_program" });
export default RegProgram;
