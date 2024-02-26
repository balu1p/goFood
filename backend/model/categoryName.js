const mongoose = require('mongoose');
const foodCategory = new mongoose.Schema(
    {CategoryName: String,},{timestamps:true}
)

module.exports = mongoose.model("Category", foodCategory);