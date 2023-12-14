import { response } from "express";
import BeritaOlahraga from "../models/BeritaOlahragaModel.js";
import path from "path";
import fs from "fs";

export const getBeritaOlahraga = async (req, res) => {
  try {
    const response = await BeritaOlahraga.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBeritaOlahragaByid = async (req, res) => {
  try {
    const response = await BeritaOlahraga.findOne({
      attributes: [
        "uuid",
        "nama_pembuat_berita_olahraga",
        "judul_berita_olahraga",
        "isi_berita_olahraga",
        "URL",
        "tanggal_berita_olahraga",
      ],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createBeritaOlahraga = async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(400).json({ msg: "No file Upload" });
  const judul_berita_olahraga = req.body.judul_berita_olahraga;
  const nama_pembuat_berita_olahraga = req.body.nama_pembuat_berita_olahraga;
  const isi_berita_olahraga = req.body.isi_berita_olahraga;
  const tanggal_berita_olahraga = req.body.tanggal_berita_olahraga;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const URL = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  console.log(ext);
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "invalid images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: " gambar harus kurang dari 5 MB" });

  file.mv(`./public/images/${fileName}`),
    async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    };
  try {
    await BeritaOlahraga.create({
      nama_pembuat_berita_olahraga: nama_pembuat_berita_olahraga,
      judul_berita_olahraga: judul_berita_olahraga,
      isi_berita_olahraga: isi_berita_olahraga,
      tanggal_berita_olahraga: tanggal_berita_olahraga,
      gambar_berita_olahraga: fileName,
      URL: URL,
    });
    res.status(201).json({ msg: "Berita berhasil ditambahkan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateBeritaOlahraga = async (req, res) => {
  const berita = await BeritaOlahraga.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!berita) return res.status(404).json({ msg: "berita tidak ditemuka" });
  let fileName = "";
  if (req.files === null) {
    fileName = BeritaOlahraga.gambar_berita_olahraga;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "invalid images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: " gambar harus kurang dari 5 MB" });

    const filepath = `./public/images/${berita.gambar_berita_olahraga}`;
    try {
      fs.unlinkSync(filepath);
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log("File tidak ditemukan.");
      } else {
        console.error("Kesalahan saat menghapus file:", err.message);
        return res.status(500).json({ msg: err.message });
      }
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const judul_berita_olahraga = req.body.judul_berita_olahraga;
  const nama_pembuat_berita_olahraga = req.body.nama_pembuat_berita_olahraga;
  const isi_berita_olahraga = req.body.isi_berita_olahraga;
  const tanggal_berita_olahraga = req.body.tanggal_berita_olahraga;
  const URL = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await BeritaOlahraga.update(
      {
        nama_pembuat_berita_olahraga: nama_pembuat_berita_olahraga,
        judul_berita_olahraga: judul_berita_olahraga,
        isi_berita_olahraga: isi_berita_olahraga,
        tanggal_berita_olahraga: tanggal_berita_olahraga,
        gambar_berita_olahraga: fileName,
        URL: URL,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Berita Olahraga berhasil Terupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBeritaOlahraga = async (req, res) => {
  const berita = await BeritaOlahraga.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!berita) return res.status(404).json({ msg: "berita tidak ditemukan" });
  try {
    await BeritaOlahraga.destroy({
      where: {
        id: berita.id,
      },
    });
    res.status(201).json({ msg: " Berita berhasil dihapus" });
  } catch (error) {}
};
