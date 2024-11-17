const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
}, { timestamps: true });  

module.exports = reviewSchema; // Export the schema, not the model
