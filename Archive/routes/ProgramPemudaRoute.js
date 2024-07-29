import {
  getProgram,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../controllers/ProgramPemuda.js";
import express from "express";
const router = express.Router();
router.get("/program", getProgram);
router.get("/program/:id", getProgramById);
router.post("/program", createProgram);
router.patch("/program/:id", updateProgram);
router.delete("/program/:id", deleteProgram);

export default router;
