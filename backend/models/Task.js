const mongoose = require("mongoose");

//task schema with  user reference and optional due date
const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  dueDate: Date,
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
