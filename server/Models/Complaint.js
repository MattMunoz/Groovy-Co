const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  open: {
    type: Boolean,
    default: true
  },
  dispute: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

module.exports = mongoose.model("Complaint", complaintSchema)