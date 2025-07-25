const Task = require("../models/Task");

//get all tasks for the logged in user
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json({ tasks });
};

//create a new task for the logged in user
exports.createTask = async (req, res) => {
  const { title, dueDate } = req.body;

  const task = await Task.create({
    user: req.user,
    title,
    dueDate,
  });

  res.status(201).json({ task });
};
