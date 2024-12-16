import React, { useState } from 'react';
import axios from 'axios';

const TaskCreate = ({ onTaskCreated }) => {  // Pass the onTaskCreated function as a prop to update parent state
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure the token is included in the request headers
      const token = localStorage.getItem('token');  // Assuming you're saving the JWT token in localStorage

      const response = await axios.post('http://localhost:5001/api/tasks', task, {
        
      });

      // Show success message and reset the form
      alert('Task created successfully!');
      setTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'low',
      });

      // Optionally, pass the new task to the parent component (if onTaskCreated is passed as a prop)
      if (onTaskCreated) {
        onTaskCreated(response.data);  // Add the new task to the parent state (if needed)
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />

        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />

        <label>Priority:</label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskCreate;
