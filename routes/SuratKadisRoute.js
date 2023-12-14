import {
  getSuratKadis,
  getSuratKadisById,
  createSuratKadis,
  deleteSuratKadis,
} from "../controllers/SuratKadis.js";

import express from "express";
const router = express.Router();
router.get("/suratkadis", getSuratKadis);
router.get("/suratkadis/:id", getSuratKadisById);
router.post("/suratkadis", createSuratKadis);

router.delete("/suratkadis/:id", deleteSuratKadis);

export default router;
