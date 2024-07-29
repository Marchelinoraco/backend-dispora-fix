import {
  getSuratSekretariat,
  getSuratSekretariatById,
  createSuratSekretariat,
  deleteSuratSekretariat,
} from "../controllers/SuratSekretariat.js";

import express from "express";
const router = express.Router();
router.get("/suratsekretariat", getSuratSekretariat);
router.get("/suratsekretariat/:id", getSuratSekretariatById);
router.post("/suratsekretariat", createSuratSekretariat);

router.delete("/suratsekretariat/:id", deleteSuratSekretariat);

export default router;
