import {
  getSuratOlahraga,
  getSuratOlahragaById,
  createSuratOlahraga,
  deleteSuratOlahraga,
} from "../controllers/SuratOlahraga.js";

import express from "express";
const router = express.Router();
router.get("/suratolahraga", getSuratOlahraga);
router.get("/suratolahraga/:id", getSuratOlahragaById);
router.post("/suratolahraga", createSuratOlahraga);

router.delete("/suratolahraga/:id", deleteSuratOlahraga);

export default router;
