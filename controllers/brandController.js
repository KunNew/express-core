import asyncHandler from "express-async-handler"
import Brand from "../models/brandModel.js"


const getBrands = asyncHandler(async (req, res) => {
    // const pageSize = 10
    // const page = Number(req.query.pageNumber) || 1
  
    // const keyword = req.query.keyword
    //   ? {
    //       name: {
    //         $regex: req.query.keyword,
    //         $options: 'i',
    //       },
    //     }
    //   : {}

    // .limit(pageSize)
    // .skip(pageSize * (page - 1))
  
    // const count = await Product.countDocuments({ ...keyword })
    const brands = await Brand.find({})
    
  
    res.json(brands);
  })

  const getBrandById = asyncHandler(async (req,res) => {
    const brand = await Brand.findById(req.params.id);
    if(brand) {
        res.json(brand);
    } else {
        res.status(404)
        throw new Error(`Brand not found`)
    }
  })
  


const createBrand = asyncHandler(async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
    description: req.body.description
  });
  const createdBrand = await brand.save()
  res.status(201).json(createdBrand)
});


const updateBrand = asyncHandler(async (req,res) => {
    const { name,description  } = req.body

    const brand = await Brand.findById(req.params.id)
    if(brand) {
        brand.name = name
        brand.description = description
       const updatedBrand = await  brand.save()
       res.json(updatedBrand)
    } else {
        res.status(404)
        throw new Error(`Brand not found`)
    }
})

const deleteBrand = asyncHandler(async (req,res) => {
    const brand = await Brand.findById(req.params.id)
    if(brand) {
        await brand.remove()
        res.json({message: `Brand removed`})
    } else {
        res.status(404)
        throw new Error(`Brand not found`)
    }
})


export {getBrands, getBrandById, createBrand, updateBrand, deleteBrand }