import {
  getProgramOlahraga,
  getProgramOlahragaById,
  createProgramOlahraga,
  updateProgramOlahraga,
  deleteProgramOlahraga,
} from "../controllers/ProgramOlahraga.js";
import express from "express";
const router = express.Router();
router.get("/programolahraga", getProgramOlahraga);
router.get("/programolahraga/:id", getProgramOlahragaById);
router.post("/programolahraga", createProgramOlahraga);
router.patch("/programolahraga/:id", updateProgramOlahraga);
router.delete("/programolahraga/:id", deleteProgramOlahraga);

export default router;
