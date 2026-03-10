
const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  maxSize: {
    type: Number,
    default: 50
  },

  currentToken: {
    type: Number,
    default: 0
  },

  avgServiceTime: {
    type: Number,
    default: 5
  }

}, { timestamps: true });

module.exports = mongoose.model("Queue", queueSchema);