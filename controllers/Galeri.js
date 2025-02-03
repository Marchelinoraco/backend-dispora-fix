import { response } from "express";
import Galeri from "../models/GaleriModels.js";
import path from "path";

export const getGaleri = async (req, res) => {
  try {
    const response = await Galeri.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGaleriByid = async (req, res) => {
  try {
    const response = await Galeri.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createGaleri = async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(400).json({ msg: "No file Upload" });
  const nama_gambar = req.body.nama_gambar;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const URL = `${req.protocol}://${req.get("host")}/galeri/${fileName}`;
  console.log(ext);
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "invalid images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: " gambar harus kurang dari 5 MB" });

  file.mv(`./public/galeri/${fileName}`),
    async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    };

  try {
    await Galeri.create({
      nama_gambar: nama_gambar,
      gambar: fileName,
      URL: URL,
    });
    res.status(201).json({ msg: "Berita berhasil ditambahkan" });
  } catch (error) {
    console.log(error.message);
  }
};
export const updateGaleri = async (req, res) => {};

export const deleteGaleri = async (req, res) => {
  const galeri = await Galeri.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!galeri) return res.status(404).json({ msg: "Gambar tidak ditemukan" });
  try {
    await Galeri.destroy({
      where: {
        id: galeri.id,
      },
    });
    res.status(201).json({ msg: " Gambar berhasil dihapus" });
  } catch (error) {}
};
