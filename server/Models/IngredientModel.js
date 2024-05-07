const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Name of ingredient is required"]
  },
  quantity:{
    type:Number,
    required: [true, "Quantity of ingredient is required"]
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model("Ingredient", ingredientSchema)