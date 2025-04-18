const foodModel = require('../models/foodModel');
const fsPromise = require('fs').promises;
const path = require('path');

const addFood = async (req,res) => {
    let image_filename = `${req.file.filename}`
    const food = foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    })
    try {
        await food.save();
        res.status(201).json({message: 'Food added successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({})
        res.status(200).json({data:foods});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

const removeFood = async(req,res)=>{
    try {
        const {id} = req.query;
        const food = await foodModel.findById(id)
        await fsPromise.unlink(path.join(__dirname,`../uploads/${food.image}`))
        await foodModel.findByIdAndDelete(id)
        res.status(200).json({message: 'Food deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {addFood,listFood,removeFood}
