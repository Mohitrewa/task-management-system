import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.fetchTasks();
                setTasks(response);
            } catch (error) {
                console.error("Error fetching tasks:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) return <p>Loading tasks...</p>;

    return (
        <div>
            <h2>Task List</h2>
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <div key={task._id} className="task">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Status: {task.status}</p>
                    </div>
                ))
            ) : (
                <p>No tasks found.</p>
            )}
        </div>
    );
};

export default TaskList;
