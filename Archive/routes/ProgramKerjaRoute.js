import {
  getProgramKerja,
  getProgramKerjaById,
  createProgramKerja,
  updateProgramKerja,
  deleteProgramKerja,
} from "../controllers/ProgramKerja.js";
import express from "express";
const router = express.Router();
router.get("/programkerja", getProgramKerja);
router.get("/programkerja/:id", getProgramKerjaById);
router.post("/programkerja", createProgramKerja);
router.patch("/programkerja/:id", updateProgramKerja);
router.delete("/programkerja/:id", deleteProgramKerja);

export default router;
