import path from "path";
import { Op } from "sequelize";
import { promisify } from "util";
import Suratolahraga from "../models/SuratOlahragaModels.js";

export const getSuratOlahraga = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let response;
  let totalPage;
  let totalRows;

  let whereCondition = {
    nama_surat_olahraga: {
      [Op.like]: "%" + search + "%",
    },
  };

  totalRows = await Suratolahraga.count({
    where: { [Op.or]: [whereCondition] },
  });
  totalPage = Math.ceil(totalRows / limit);
  response = await Suratolahraga.findAll({
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

export const getSuratOlahragaById = async (req, res) => {
  try {
    const response = await Suratolahraga.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSuratOlahraga = async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(400).json({ msg: "No file Upload" });
  const nama_surat_olahraga = req.body.nama_surat_olahraga;
  const tanggal_surat_olahraga = req.body.tanggal_surat_olahraga;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const URL = `${req.protocol}://${req.get("host")}/surat/${fileName}`;
  console.log(ext);
  const allowedType = [".png", ".jpg", ".jpeg", ".pdf", ".docx", ".doc"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "invalid images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: " images must be less 5 MB" });

  file.mv(`./public/surat/${fileName}`),
    async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    };
  try {
    await Suratolahraga.create({
      nama_surat_olahraga: nama_surat_olahraga,
      tanggal_surat_olahraga: tanggal_surat_olahraga,
      gambar_surat_olahraga: fileName,
      URL: URL,
    });
    res.status(201).json({ msg: "Surat Olahraga berhasil ditambahkan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSuratOlahraga = async (req, res) => {
  const suratolahraga = await Suratolahraga.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!suratolahraga)
    return res.status(404).json({ msg: "Surat Olahraga tidak ditemukan" });
  try {
    await Suratolahraga.destroy({
      where: {
        id: suratolahraga.id,
      },
    });
    res.status(200).json({ msg: "Surat Olahraga berhasil dihapus" });
  } catch (error) {}
};
