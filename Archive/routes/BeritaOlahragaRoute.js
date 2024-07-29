import {
  getBeritaOlahraga,
  getBeritaOlahragaByid,
  updateBeritaOlahraga,
  createBeritaOlahraga,
  deleteBeritaOlahraga,
} from "../controllers/BeritaOlahraga.js";
import express from "express";

const router = express.Router();
router.get("/beritaolahraga", getBeritaOlahraga);
router.get("/beritaolahraga/:id", getBeritaOlahragaByid);
router.post("/beritaolahraga", createBeritaOlahraga);
router.patch("/beritaolahraga/:id", updateBeritaOlahraga);
router.delete("/beritaolahraga/:id", deleteBeritaOlahraga);

export default router;
