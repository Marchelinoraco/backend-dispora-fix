import { response } from "express";
import Komentar from "../models/KomentarModel.js";
import Forum from "../models/ForumModel.js";

export const getKomentar = async (req, res) => {
  try {
    const response = await Komentar.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getKomentarbyForum = async (req, res) => {
  try {
    const response = await Komentar.findOne({
      where: {
        id_forum: req.params.forum,
      },
      include: [
        {
          model: Forum,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createKomentar = async (req, res) => {
  try {
    const { id_forum, nama_pembuat_komentar, isi_komentar } = req.body;
    await Komentar.create({
      id_forum: id_forum,
      nama_pembuat_komentar: nama_pembuat_komentar,
      isi_komentar: isi_komentar,
    });
    res.status(200).json({ msg: "Komentar berhasil diposting" });
  } catch (error) {
    res.status(404).json({ msg: "Komentar Tidak Ditemukan" });
  }
};
export const deleteKomentar = async (req, res) => {
  try {
    const komentar = await Komentar.findOne({
      where: {
        id_komentar: req.params.id,
      },
    });

    if (!komentar)
      return res.status(404).json({ msg: "Komentar tidak ditemukan" });

    await komentar.destroy();
    res.status(201).json({ msg: "Komentar berhasil dihapus" });
  } catch (error) {
    res.status(404).json({ msg: "Komentar gagal dihapus" });
  }
};
