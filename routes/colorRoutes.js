import express from "express";
import {
  createColor,
  getColors,
  deleteColor,
  getColorById,
  updateColor,
} from "../controllers/colorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route(`/`).get(protect,getColors).post(createColor);
router.route(`/:id`).get(getColorById).put(updateColor).delete(deleteColor);
export default router;
