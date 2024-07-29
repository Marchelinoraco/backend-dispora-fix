import ProgramKerja from "../models/ProgramKerjaModel.js";
import { response } from "express";
import path from "path";
import fs from "fs";

export const getProgramKerja = async (req, res) => {
  try {
    const response = await ProgramKerja.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProgramKerjaById = async (req, res) => {
  try {
    const response = await ProgramKerja.findOne({
      attributes: [
        "uuid",
        "tahun_program_kerja",
        "gambar_program_kerja",
        "URL",
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

export const createProgramKerja = async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(400).json({ msg: "No file Upload" });
  const tahun_program_kerja = req.body.tahun_program_kerja;
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
    return res.status(422).json({ msg: " images must be less 5 MB" });

  file.mv(`./public/images/${fileName}`),
    async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    };
  try {
    await ProgramKerja.create({
      tahun_program_kerja: tahun_program_kerja,
      gambar_program_olahraga: fileName,
      URL: URL,
    });
    res.status(201).json({ msg: "Program Kerja berhasil ditambahkan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProgramKerja = async (req, res) => {
  const program = await ProgramKerja.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!program)
    return res.status(404).json({ msg: "program kerja tidak ditemuka" });
  let fileName = "";
  if (req.files === null) {
    fileName = ProgramKerja.gambar_program_kerja;
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

    const filepath = `./public/images/${program.gambar_program_kerja}`;
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
  const nama_pembuat_program_olahraga = req.body.nama_pembuat_program_olahraga;
  const kontak_admin_program_olahraga = req.body.kontak_admin_program_olahraga;
  const nama_program_olahraga = req.body.nama_program_olahraga;
  const URL = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  try {
    await ProgramOlahraga.update(
      {
        nama_pembuat_program_olahraga: nama_pembuat_program_olahraga,
        kontak_admin_program_olahraga: kontak_admin_program_olahraga,
        nama_program_olahraga: nama_program_olahraga,
        gambar_program_olahraga: fileName,
        URL: URL,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Program Olahraga berhasil Terupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProgramKerja = async (req, res) => {
  const program = await ProgramKerja.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!program) return res.status(404).json({ msg: "berita tidak ditemukan" });
  try {
    await ProgramKerja.destroy({
      where: {
        id: program.id,
      },
    });
    res.status(201).json({ msg: "Program berhasil dihapus" });
  } catch (error) {}
};
