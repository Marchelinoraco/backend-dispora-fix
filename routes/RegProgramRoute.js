import {
  getRegProgram,
  getRegProgramById,
  createRegProgram,
  updateRegProgram,
  deleteRegProgram,
} from "../controllers/RegProgram.js";

import express from "express";
const router = express.Router();
router.get("/regprogram", getRegProgram);
router.get("/regprogram/:id", getRegProgramById);
router.post("/regprogram", createRegProgram);
router.patch("/regprogram/:id", updateRegProgram);
router.delete("/regprogram/:id", deleteRegProgram);

export default router;
