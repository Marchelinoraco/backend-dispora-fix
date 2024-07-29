import RegProgram from "../models/RegProgramModels.js";
import path from "path";
import { Op } from "sequelize";
import { promisify } from "util";

export const getRegProgram = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let response;
  let totalPage;
  let totalRows;

  let whereCondition = {
    nama_reg: {
      [Op.like]: "%" + search + "%",
    },
  };

  totalRows = await RegProgram.count({
    where: { [Op.or]: [whereCondition] },
  });
  totalPage = Math.ceil(totalRows / limit);
  response = await RegProgram.findAll({
    where: { [Op.or]: [whereCondition] },
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });
  res.json({
    result: response,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

export const getRegProgramById = async (req, res) => {
  try {
    const response = await RegProgram.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRegProgram = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return res.status(400).json({ msg: "no File UPLOAD" });
  const nama_reg = req.body.nama_reg;
  const umur_reg = req.body.umur_reg;
  const tempat_tanggal_lahir = req.body.tempat_tanggal_lahir;
  const no_telepon = req.body.no_telepon;
  const nim = req.body.nim;
  const IPK = req.body.IPK;
  const nik = req.body.nik;
  const alamat = req.body.alamat;
  const kecamatan = req.body.kecamatan;
  const desa = req.body.desa;
  const universitas = req.body.universitas;
  const fakultas = req.body.fakultas;
  const jurusan = req.body.jurusan;
  const wisuda = req.body.wisuda;
  const yudisium = req.body.yudisium;
  const semester_s1 = req.body.semester_s1;
  const semester_s2 = req.body.semester_s2;
  const semester_s3 = req.body.semester_s3;
  const semester_diploma = req.body.semester_diploma;
  const gambar_ktp = req.files.gambar_ktp;
  const gambar_khs = req.files.gambar_khs;
  const gambar_spbupati = req.files.gambar_spbupati;
  const gambar_biodatareg = req.files.gambar_biodatareg;
  const gambar_pasfoto = req.files.gambar_pasfoto;
  const gambar_belumbea = req.files.gambar_belumbea;
  const gambar_databpp = req.files.gambar_databpp;
  const gambar_ketpimpinan = req.files.gambar_ketpimpinan;
  const gambar_kartumahasiswa = req.files.gambar_kartumahasiswa;
  const gambar_kk = req.files.gambar_kk;
  const gambar_proposalakhir = req.files.gambar_proposalakhir;

  const fileSize1 = gambar_ktp.data.length;
  const fileSize2 = gambar_khs.data.length;
  const fileSize3 = gambar_spbupati.data.length;
  const fileSize4 = gambar_biodatareg.data.length;
  const fileSize5 = gambar_pasfoto.data.length;
  const fileSize6 = gambar_belumbea.data.length;
  const fileSize7 = gambar_databpp.data.length;
  const fileSize8 = gambar_ketpimpinan.data.length;
  const fileSize9 = gambar_kartumahasiswa.data.length;
  const fileSize10 = gambar_kk.data.length;
  const fileSize11 = gambar_proposalakhir.data.length;

  const ext1 = path.extname(gambar_ktp.name);
  const ext2 = path.extname(gambar_khs.name);
  const ext3 = path.extname(gambar_spbupati.name);
  const ext4 = path.extname(gambar_biodatareg.name);
  const ext5 = path.extname(gambar_pasfoto.name);
  const ext6 = path.extname(gambar_belumbea.name);
  const ext7 = path.extname(gambar_databpp.name);
  const ext8 = path.extname(gambar_ketpimpinan.name);
  const ext9 = path.extname(gambar_kartumahasiswa.name);
  const ext10 = path.extname(gambar_kk.name);
  const ext11 = path.extname(gambar_proposalakhir.name);
  const file1 = gambar_ktp.md5 + ext1;
  const file2 = gambar_khs.md5 + ext2;
  const file3 = gambar_spbupati.md5 + ext3;
  const file4 = gambar_biodatareg.md5 + ext4;
  const file5 = gambar_pasfoto.md5 + ext5;
  const file6 = gambar_belumbea.md5 + ext6;
  const file7 = gambar_databpp.md5 + ext7;
  const file8 = gambar_ketpimpinan.md5 + ext8;
  const file9 = gambar_kartumahasiswa.md5 + ext9;
  const file10 = gambar_kk.md5 + ext10;
  const file11 = gambar_proposalakhir.md5 + ext11;

  const URL_ktp = `${req.protocol}://${req.get("host")}/register/${file1}`;
  const URL_khs = `${req.protocol}://${req.get("host")}/register/${file2}`;
  const URL_spbupati = `${req.protocol}://${req.get("host")}/register/${file3}`;
  const URL_biodatareg = `${req.protocol}://${req.get(
    "host"
  )}/register/${file4}`;
  const URL_pasfoto = `${req.protocol}://${req.get("host")}/register/${file5}`;
  const URL_databpp = `${req.protocol}://${req.get("host")}/register/${file6}`;
  const URL_ketpimpinan = `${req.protocol}://${req.get(
    "host"
  )}/register/${file7}`;
  const URL_kartumahasiswa = `${req.protocol}://${req.get(
    "host"
  )}/register/${file8}`;
  const URL_kk = `${req.protocol}://${req.get("host")}/register/${file9}`;
  const URL_proposalakhir = `${req.protocol}://${req.get(
    "host"
  )}/register/${file10}`;
  const URL_belumbea = `${req.protocol}://${req.get(
    "host"
  )}/register/${file11}`;

  const allowedType = [".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx"];

  if (
    !allowedType.includes(ext1.toLowerCase()) ||
    !allowedType.includes(ext2.toLowerCase()) ||
    !allowedType.includes(ext3.toLowerCase()) ||
    !allowedType.includes(ext4.toLowerCase()) ||
    !allowedType.includes(ext5.toLowerCase()) ||
    !allowedType.includes(ext6.toLowerCase()) ||
    !allowedType.includes(ext7.toLowerCase()) ||
    !allowedType.includes(ext8.toLowerCase()) ||
    !allowedType.includes(ext9.toLowerCase()) ||
    !allowedType.includes(ext10.toLowerCase()) ||
    !allowedType.includes(ext11.toLowerCase())
  )
    return res.status(422).json({ msg: "invalid images" });
  if (
    fileSize1 > 5000000 ||
    fileSize2 > 5000000 ||
    fileSize3 > 5000000 ||
    fileSize4 > 5000000 ||
    fileSize5 > 5000000 ||
    fileSize6 > 5000000 ||
    fileSize7 > 5000000 ||
    fileSize8 > 5000000 ||
    fileSize9 > 5000000 ||
    fileSize10 > 5000000 ||
    fileSize11 > 5000000
  )
    return res.status(422).json({ msg: " file harus kurang dari 5 MB" });

  try {
    await Promise.all([
      promisify(gambar_ktp.mv)(`./public/register/${file1}`),
      promisify(gambar_khs.mv)(`./public/register/${file2}`),
      promisify(gambar_spbupati.mv)(`./public/register/${file3}`),
      promisify(gambar_biodatareg.mv)(`./public/register/${file4}`),
      promisify(gambar_pasfoto.mv)(`./public/register/${file5}`),
      promisify(gambar_belumbea.mv)(`./public/register/${file6}`),
      promisify(gambar_databpp.mv)(`./public/register/${file7}`),
      promisify(gambar_ketpimpinan.mv)(`./public/register/${file8}`),
      promisify(gambar_kartumahasiswa.mv)(`./public/register/${file9}`),
      promisify(gambar_kk.mv)(`./public/register/${file10}`),
      promisify(gambar_proposalakhir.mv)(`./public/register/${file11}`),
    ]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }

  try {
    await RegProgram.create({
      nama_reg: nama_reg,
      umur_reg: umur_reg,
      tempat_tanggal_lahir: tempat_tanggal_lahir,
      no_telepon: no_telepon,
      nim: nim,
      IPK: IPK,
      nik: nik,
      alamat: alamat,
      kecamatan: kecamatan,
      desa: desa,
      universitas: universitas,
      fakultas: fakultas,
      jurusan: jurusan,
      wisuda: wisuda,
      yudisium: yudisium,
      semester_s1: semester_s1,
      semester_s2: semester_s2,
      semester_s3: semester_s3,
      semester_diploma: semester_diploma,
      gambar_ktp: file1,
      gambar_khs: file2,
      gambar_spbupati: file3,
      gambar_biodatareg: file4,
      gambar_pasfoto: file5,
      gambar_belumbea: file6,
      gambar_databpp: file7,
      gambar_ketpimpinan: file8,
      gambar_kartumahasiswa: file9,
      gambar_kk: file10,
      gambar_proposalakhir: file11,
      URL_ktp: URL_ktp,
      URL_khs: URL_khs,
      URL_spbupati: URL_spbupati,
      URL_biodatareg: URL_biodatareg,
      URL_pasfoto: URL_pasfoto,
      URL_belumbea: URL_belumbea,
      URL_databpp: URL_databpp,
      URL_ketpimpinan: URL_ketpimpinan,
      URL_kartumahasiswa: URL_kartumahasiswa,
      URL_kk: URL_kk,
      URL_proposalakhir: URL_proposalakhir,
    });
    res.status(201).json({ message: "RegisterProgram berhasil ditambahkan" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const updateRegProgram = async (req, res) => {
  const {
    nama_reg,
    umur_reg,
    gambar_ktp,
    gambar_khs,
    gambar_spbupati,
    gambar_biodatareg,
    gambar_pasfoto,
    gambar_belumbea,
    gambar_databpp,
    gambar_ketpimpinan,
    gambar_kartumahasiswa,
    gambar_kk,
    gambar_proposalakhir,
    URL_ktp,
    URL_khs,
    URL_spbupati,
    URL_biodatareg,
    URL_pasfoto,
    URL_belumbea,
    URL_databpp,
    URL_ketpimpinan,
    URL_kartumahasiswa,
    URL_kk,
    URL_proposalakhir,
  } = req.body;

  const regprogram = await RegProgram.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!program) return res.status(404).json({ msg: "berita tidak ditemukan" });
  try {
    await RegProgram.update(
      {
        nama_reg: nama_reg,
        umur_reg: umur_reg,
        gambar_ktp: gambar_ktp,
        gambar_khs: gambar_khs,
        gambar_spbupati: gambar_spbupati,
        gambar_biodatareg: gambar_biodatareg,
        gambar_pasfoto: gambar_pasfoto,
        gambar_belumbea: gambar_belumbea,
        gambar_databpp: gambar_databpp,
        gambar_ketpimpinan: gambar_ketpimpinan,
        gambar_kartumahasiswa: gambar_kartumahasiswa,
        gambar_kk: gambar_kk,
        gambar_proposalakhir: gambar_proposalakhir,
        URL_ktp: URL_ktp,
        URL_khs: URL_khs,
        URL_spbupati: URL_spbupati,
        URL_biodatareg: URL_biodatareg,
        URL_pasfoto: URL_pasfoto,
        URL_belumbea: URL_belumbea,
        URL_databpp: URL_databpp,
        URL_ketpimpinan: URL_ketpimpinan,
        URL_kartumahasiswa: URL_kartumahasiswa,
        URL_kk: URL_kk,
        URL_proposalakhir: URL_proposalakhir,
      },
      {
        where: {
          id: regprogram.id,
        },
      }
    );
    res.status(200).json({ msg: "Program Berhasil dipebarui" });
  } catch (error) {}
};

export const deleteRegProgram = async (req, res) => {
  const regprogram = await RegProgram.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!regprogram)
    return res.status(404).json({ msg: "pendaftar tidak ditemukan" });
  try {
    await RegProgram.destroy({
      where: {
        id: regprogram.id,
      },
    });
    res.status(200).json({ msg: "pendaftar berhasil dihapus" });
  } catch (error) {}
};
