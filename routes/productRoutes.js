import express from "express";
import {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../controllers/productController.js";
import upload from "./uploadRoutes.js";
const router = express.Router();

router.route(`/`).get(getProducts).post(upload.single("image"), createProduct);
router
  .route(`/:id`)
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);
export default router;
