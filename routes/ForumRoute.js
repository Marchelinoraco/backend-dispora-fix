import express from "express";
import {
  getForum,
  getForumbyKategori,
  deleteForum,
  createForum,
  getForumById,
} from "../controllers/Forum.js";

const router = express.Router();

router.get("/forum", getForum);
router.get("/forum/kategori/:kategori", getForumbyKategori);
router.get("/forum/:id", getForumById);
router.post("/forum", createForum);
router.delete("/forum/:id", deleteForum);

export default router;
