const express = require("express");
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/tasks
router.get("/", auth, getTasks);

// POST /api/tasks
router.post("/", auth, createTask);

// DELETE /api/tasks/:id
router.delete("/:id", auth, deleteTask);

// PUT /api/tasks/:id
router.put("/:id", auth, updateTask);

module.exports = router;
