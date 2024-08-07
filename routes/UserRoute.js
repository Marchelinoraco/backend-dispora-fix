import express from "express";
import {
  getUsers,
  getUserById,
  createAdmin,
  deleteAdmin,
} from "../controllers/User.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUsers);
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.post("/admin", createAdmin);
router.delete("/admin/:id", deleteAdmin);

export default router;
