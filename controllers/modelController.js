import asyncHandler from "express-async-handler";
import Model from "../models/modelModel.js";

const getModels = asyncHandler(async (req, res) => {
  const models = await Model.find({}).populate('brand');
  res.json(models);
});

const getModelById = asyncHandler(async (req, res) => {
  const model = await Model.findById(req.params.id).populate('brand');
  if (model) {
    res.json(model);
  } else {
    res.status(404);
    throw new Error(`Model not found`);
  }
});

const createModel = asyncHandler(async (req, res) => {
  const { name,yearMade,brand } = req.body;
  const model = new Model({
    name,
    yearMade,
    brand
  });
  const createdmodel = await model.save();
  res.status(201).json(createdmodel);
});

const updateModel = asyncHandler(async (req, res) => {
  const { name,yearMade,brand } = req.body;
  const model = await Model.findById(req.params.id);
  if (model) {
    model.name = name;
    model.yearMade = yearMade
    model.brand = brand
    const updatedmodel = await model.save();
    res.json(updatedmodel);
  } else {
    res.status(404);
    throw new Error(`Model not found`);
  }
});

const deleteModel = asyncHandler(async (req, res) => {
  const model = await Model.findById(req.params.id);
  if (model) {
    await model.remove({});
    res.json({ message: `Model removed` });
  } else {
    res.status(404);
    throw new Error(`Model not found`);
  }
});

export { getModels, createModel, getModelById, updateModel, deleteModel };
