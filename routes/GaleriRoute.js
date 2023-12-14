import {
  getGaleri,
  createGaleri,
  getGaleriByid,
  deleteGaleri,
} from "../controllers/Galeri.js";
import express from "express";

const router = express.Router();
router.get("/galeri", getGaleri);
router.get("/galeri/:id", getGaleriByid);
router.post("/galeri", createGaleri);
router.delete("/galeri/:id", deleteGaleri);

export default router;
