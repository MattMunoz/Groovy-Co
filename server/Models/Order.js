const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderer: {
    type: String,
    required: true
  },
  fulfilled:{
    type:Boolean,
    default: false
  },
  complete: {
    type: Boolean,
    default: false
  },
  type:{
    type: String,
    required: true
  },

  items: {
    type: [{
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: String,
        required: true
      }
    }],
    required: true
  },
  createdAt:{
    type:Date,
    default: new Date()
  }
})

module.exports = mongoose.model("Order", orderSchema)