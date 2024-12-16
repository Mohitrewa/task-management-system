import React, { useState } from 'react';
import api from '../utils/api';

const TaskForm = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low');
    const [status, setStatus] = useState('pending');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newTask = { title, description, dueDate, priority, status };
            const createdTask = await api.createTask(newTask);
            onTaskCreated(createdTask);
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('low');
            setStatus('pending');
            alert("Task created successfully!");
        } catch (error) {
            console.error("Error creating task:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
            <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskForm;
