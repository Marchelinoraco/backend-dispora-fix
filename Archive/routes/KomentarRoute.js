import express from "express";
import {
  getKomentar,
  getKomentarbyForum,
  createKomentar,
  deleteKomentar,
} from "../controllers/Komentar.js";

const router = express.Router();

router.get("/komentar", getKomentar);
router.get("/komentar/forum/:forum", getKomentarbyForum);
router.post("/komentar", createKomentar);
router.delete("/komentar/:id", deleteKomentar);

export default router;
