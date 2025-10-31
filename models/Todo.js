const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  kaam: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Todo", TodoSchema);