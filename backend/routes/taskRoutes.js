const express = require("express");
const { createTask, getTasks } = require("../controllers/taskController");
const { authenticate } = require("../middleware/authmiddleware");

const router = express.Router();

// Protected routes: Only accessible to authenticated users
router.post("/", createTask); // Create a task
router.get("/", getTasks);   // Get all tasks

module.exports = router;
