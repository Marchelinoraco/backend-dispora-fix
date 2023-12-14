import express from "express";
import {
  getUsers,
  getUserById,
  createAdmin,
  deleteAdmin,
} from "../controllers/User.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", verifyUser, getUserById);
router.post("/admin", createAdmin);
router.delete("/admin/:id", deleteAdmin);

export default router;
