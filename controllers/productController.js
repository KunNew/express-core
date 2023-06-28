import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate([
    {
      path: "model", // populate model
      populate: {
        path: "brand", // in model, populate brand
      },
    },
    {
      path: "color",
    },
  ]);
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error(`Product not found`);
  }
});

const createProduct = asyncHandler(async (req, res) => {
  // console.log(req.file, "file");
  const { name, availableUnit, salePrice, color, model, photo } = req.body;
  const product = new Product({
    name,
    availableUnit,
    salePrice,
    color,
    model,
    photo: req.file ? req.file.path : undefined,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, availableUnit, salePrice, color, model, photo } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.availableUnit = availableUnit;
    product.salePrice = salePrice;
    product.color = color;
    product.model = model;
    product.photo = photo;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error(`Product not found`);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove({});
    res.json({ message: `Product removed` });
  } else {
    res.status(404);
    throw new Error(`Product not found`);
  }
});

export {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
