import {
  getSuratPemuda,
  getSuratPemudaById,
  createSuratPemuda,
  deleteSuratPemuda,
} from "../controllers/SuratPemuda.js";

import express from "express";
const router = express.Router();
router.get("/suratpemuda", getSuratPemuda);
router.get("/suratpemuda/:id", getSuratPemudaById);
router.post("/suratpemuda", createSuratPemuda);

router.delete("/suratpemuda/:id", deleteSuratPemuda);

export default router;
