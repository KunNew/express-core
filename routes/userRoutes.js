import express from "express";
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "./uploadRoutes.js";
router
  .route("/")
  .post(upload.single("avatar"), registerUser)
  .get(protect, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, deleteUser)
  .get(protect, getUserById)
  .put(upload.single("avatar"), protect, updateUser);

export default router;
