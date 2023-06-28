import express from "express";
import {
  createModel,
  getModels,
  deleteModel,
  getModelById,
  updateModel,
} from "../controllers/modelController.js";

const router = express.Router();

router.route(`/`).get(getModels).post(createModel);
router.route(`/:id`).get(getModelById).put(updateModel).delete(deleteModel);
export default router;
