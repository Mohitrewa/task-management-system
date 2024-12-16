const Task = require("../models/taskModel");

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, priority, status } = req.body;

        const newTask = await Task.create({
            title,
            description,
            dueDate,
            priority,
            status,
            createdBy: "12", // Ensure `req.user` is populated by the `authenticate` middleware
        });
        console.log(req.body)

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create task." });
    }
};

// Fetch all tasks for the authenticated user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: "12"}); // Fetch tasks for the logged-in user
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch tasks." });
    }
};

module.exports = { createTask, getTasks };
