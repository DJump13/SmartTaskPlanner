const express = require("express");
const { autoPrioritize } = require("../controllers/aiController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/ai/auto-prioritize
router.post("/auto-prioritize", auth, autoPrioritize);

module.exports = router;
