import Forum from "../models/ForumModel.js";
import path from "path";
import fs from "fs";

export const getForum = async (req, res) => {
  try {
    const response = await Forum.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getForumById = async (req, res) => {
  try {
    const response = await Forum.findOne({
      where: {
        id_forum: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getForumbyKategori = async (req, res) => {
  try {
    const response = await Forum.findAll({
      where: {
        kategori: req.params.kategori,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createForum = async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(400).json({ msg: "No file Upload" });
  const nama_pembuat_forum = req.body.nama_pembuat_forum;
  const kategori = req.body.kategori;
  const nama_forum = req.body.nama_forum;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const URL = `${req.protocol}://${req.get("host")}/forum/${fileName}`;
  console.log(ext);
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "invalid images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: " images must be less 5 MB" });

  file.mv(`./public/forum/${fileName}`),
    async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    };
  try {
    await Forum.create({
      nama_pembuat_forum: nama_pembuat_forum,
      kategori: kategori,
      nama_forum: nama_forum,
      file: fileName,
      URL: URL,
    });
    res.status(201).json({ msg: "Forum berhasil ditambahkan" });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteForum = async (req, res) => {
  const forum = await Forum.findOne({
    where: {
      id_forum: req.params.id,
    },
  });

  if (!forum) return res.status(404).json({ msg: "Forum tidak ditemukan" });
  try {
    await Forum.destroy({
      where: {
        id_forum: program.id,
      },
    });
    res.status(201).json({ msg: "Forum berhasil dihapus" });
  } catch (error) {}
};
