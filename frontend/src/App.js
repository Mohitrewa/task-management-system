import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskCreate from './components/TaskCreate'; 
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import PriorityList from './components/PriorityList';
import './App.css';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  
  // Get the JWT token from localStorage
  const token = localStorage.getItem("token");

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios('http://localhost:5001/api/tasks', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in headers
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.status}`);
        }
        const data = await response.data;
        console.log(data)
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchTasks();
  }, [token]);  // Dependency on token

  // Add a new task
  const addTask = async (task) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error('Failed to add task');
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  // Update task priority
  const updateTaskPriority = async (taskId, newPriority) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include token in headers
        },
        body: JSON.stringify({ priority: newPriority }),
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, priority: newPriority } : task
        )
      );
    } catch (error) {
      console.error('Error updating task priority:', error.message);
    }
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList tasks={tasks} />} />
        <Route path="/tasks/create" element={<TaskCreate onSubmit={addTask} />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/priority" element={<PriorityList tasks={tasks} updateTaskPriority={updateTaskPriority} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
