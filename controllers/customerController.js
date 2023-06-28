import asyncHandler from "express-async-handler";
import Customer from "../models/customerModel.js";

const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({});
  res.json(customers);
});

const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error(`Customer not found`);
  }
});

const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, address, telephone } = req.body;
  const customer = new Customer({
    name,
    email,
    address,
    telephone,
  });
  const createdCustomer = await customer.save();
  res.status(201).json(createdCustomer);
});

const updateCustomer = asyncHandler(async (req, res) => {
  const { name, email, address, telephone } = req.body;
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    customer.name = name;
    customer.email = email;
    customer.address = address;
    customer.telephone = telephone;
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error(`Customer not found`);
  }
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    await customer.remove({});
    res.json({ message: `Customer removed` });
  } else {
    res.status(404);
    throw new Error(`Customer not found`);
  }
});

export { getCustomers, createCustomer, getCustomerById, updateCustomer, deleteCustomer };
