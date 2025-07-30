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
