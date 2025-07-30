const Task = require("../models/Task");

//get all tasks for the logged in user
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json({ tasks });
};

//create a new task for the logged in user
exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  try {
    const newTask = await Task.create({
      user: req.user.id,
      title,
      description,
      dueDate,
      ...(priority && { priority }), //only include priority if provided
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task: ", err.message);
    res.status(500).json({ error: "Failed to create task." });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) return res.status(404).json({ error: "Task not found." });
    if (task.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized." });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error deleting task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found." });
    if (task.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized." });

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task.", err);
    res.status(500).json({ message: "Server error updating task." });
  }
};
