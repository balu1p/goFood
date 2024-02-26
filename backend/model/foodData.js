const mongoose = require('mongoose');
const foodData = new mongoose.Schema({
    CategoryName: String,
    name: String,
    img: String,
    options: [
        Object
    ],
    description: String,
},{timestamps:true})

module.exports = mongoose.model("Food", foodData);