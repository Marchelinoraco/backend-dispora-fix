import {
  getBerita,
  getBeritaByid,
  updateBerita,
  createBerita,
  deleteBerita,
} from "../controllers/BeritaPemuda.js";
import express from "express";

const router = express.Router();
router.get("/berita", getBerita);
router.get("/berita/:id", getBeritaByid);
router.post("/berita", createBerita);
router.patch("/berita/:id", updateBerita);
router.delete("/berita/:id", deleteBerita);

export default router;
