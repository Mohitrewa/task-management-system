import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TaskDetails.css';

const TaskDetails = () => {
  const { id } = useParams(); // Retrieve task ID from URL
  const [task, setTask] = useState(null);

  // Fetch task details by ID
  useEffect(() => {
    axios.get(`/api/tasks/${id}`)
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
      });
  }, [id]); // Re-fetch if ID changes

  if (!task) return <div>Loading...</div>;

  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p><strong>Due Date:</strong> {task.due_date}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <button>Mark as Completed</button>
    </div>
  );
};

export default TaskDetails;
