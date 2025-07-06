const mongoose = require("mongoose");

const PYQs = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    
  },
  subjectName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("PYQ", PYQs);