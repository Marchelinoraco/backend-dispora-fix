import User from "../models/UserModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
  if (req.body.email === "")
    return res.status(404).json({ message: "Email tidak boleh kosong" });
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user)
    return res.status(404).json({ message: "Pengguna tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ message: "Kata sandi salah" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const username = user.username;
  const email = user.email;
  const password = user.password;
  const role = user.role;
  res.status(200).json({ uuid, username, email, password, role });
};

export const me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Mohon masuk ke akun Anda!" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user)
    return res.status(404).json({ message: "Pengguna tidak ditemukan" });
  res.status(200).json(user);
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: "Tidak dapat keluar" });
    res.status(200).json({ message: "Anda telah keluar" });
  });
};
