const express = require("express");
const { getTasks, createTask } = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/tasks
router.get("/", auth, getTasks);

// POST /api/tasks
router.post("/", auth, createTask);

module.exports = router;
