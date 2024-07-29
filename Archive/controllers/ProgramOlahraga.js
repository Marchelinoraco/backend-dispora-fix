import ProgramOlahraga from "../models/ProgramOlahragaModel.js";
import path from "path";
import fs from "fs";

export const getProgramOlahraga = async (req, res) => {
  try {
    const response = await ProgramOlahraga.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getProgramOlahragaById = async (req, res) => {
  try {
    const response = await ProgramOlahraga.findOne({
      attributes: [
        "uuid",
        "nama_pembuat_program_olahraga",
        "kontak_admin_program_olahraga",
        "nama_program_olahraga",
        "gambar_program_olahraga",
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
export const createProgramOlahraga = async (req, res) => {
  if (!req.files || !req.files.file)
    return res.status(400).json({ msg: "No file Upload" });
  const nama_pembuat_program_olahraga = req.body.nama_pembuat_program_olahraga;
  const kontak_admin_program_olahraga = req.body.kontak_admin_program_olahraga;
  const nama_program_olahraga = req.body.nama_program_olahraga;
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
    await ProgramOlahraga.create({
      nama_pembuat_program_olahraga: nama_pembuat_program_olahraga,
      kontak_admin_program_olahraga: kontak_admin_program_olahraga,
      nama_program_olahraga: nama_program_olahraga,
      gambar_program_olahraga: fileName,
      URL: URL,
    });
    res.status(201).json({ msg: "Program berhasil ditambahkan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProgramOlahraga = async (req, res) => {
  const program = await ProgramOlahraga.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!program)
    return res.status(404).json({ msg: "program olahraga tidak ditemuka" });
  let fileName = "";
  if (req.files === null) {
    fileName = ProgramOlahraga.gambar_berita_olahraga;
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

    const filepath = `./public/images/${program.gambar_program_olahraga}`;
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

export const deleteProgramOlahraga = async (req, res) => {
  const program = await ProgramOlahraga.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!program) return res.status(404).json({ msg: "berita tidak ditemukan" });
  try {
    await ProgramOlahraga.destroy({
      where: {
        id: program.id,
      },
    });
    res.status(201).json({ msg: "Program berhasil dihapus" });
  } catch (error) {}
};
