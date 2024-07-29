import path from "path";
import Suratkadis from "../models/SuratKadisModels.js";
import { Op } from "sequelize";
import { promisify } from "util";

export const getSuratKadis = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;

  let response;
  let totalPage;
  let totalRows;

  let whereCondition = {
    nama_surat_kadis: {
      [Op.like]: "%" + search + "%",
    },
  };

  totalRows = await Suratkadis.count({
    where: { [Op.or]: [whereCondition] },
  });
  totalPage = Math.ceil(totalRows / limit);
  response = await Suratkadis.findAll({
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

export const getSuratKadisById = async (req, res) => {
  try {
    const response = await Suratkadis.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSuratKadis = async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(400).json({ msg: "No file Upload" });
  const nama_surat_kadis = req.body.nama_surat_kadis;
  const tanggal_surat_kadis = req.body.tanggal_surat_kadis;
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
    await Suratkadis.create({
      nama_surat_kadis: nama_surat_kadis,
      tanggal_surat_kadis: tanggal_surat_kadis,
      gambar_surat_kadis: fileName,
      URL: URL,
    });
    res.status(201).json({ msg: "Surat berhasil ditambahkan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSuratKadis = async (req, res) => {
  const suratkadis = await Suratkadis.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!suratkadis)
    return res.status(404).json({ msg: "Surat Kadis tidak ditemukan" });
  try {
    await Suratkadis.destroy({
      where: {
        id: suratkadis.id,
      },
    });
    res.status(200).json({ msg: "Surat Kadis berhasil dihapus" });
  } catch (error) {}
};
