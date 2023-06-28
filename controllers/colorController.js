import asyncHandler from "express-async-handler";
import Color from "../models/colorModel.js";

const getColors = asyncHandler(async (req, res) => {
  const { search, sortBy } = req.query;
  const queryObject = {};
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  let result = Color.find(queryObject);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.rowsPerPage) || 2;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const colors = await result;
  const totalColors = await Color.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalColors / limit);

  res.json({ colors, totalColors, numOfPages });
});

const getColorById = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (color) {
    res.json(color);
  } else {
    res.status(404);
    throw new Error(`Color not found`);
  }
});

const createColor = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const color = new Color({
    name,
  });
  const createdColor = await color.save();
  res.status(201).json(createdColor);
});

const updateColor = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const color = await Color.findById(req.params.id);
  if (color) {
    color.name = name;
    const updatedColor = await color.save();
    res.json(updatedColor);
  } else {
    res.status(404);
    throw new Error(`Color not found`);
  }
});

const deleteColor = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  if (color) {
    await color.remove({});
    res.json({ message: `Color removed` });
  } else {
    res.status(404);
    throw new Error(`Color not found`);
  }
});

export { getColors, createColor, getColorById, updateColor, deleteColor };
