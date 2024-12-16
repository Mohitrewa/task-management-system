const API_URL = 'http://localhost:5001/api'; // Ensure the URL matches your backend

// Fetch tasks
export const fetchTasks = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/tasks`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch tasks");
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Create task
export const createTask = async (taskData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) throw new Error("Failed to create task");
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// Register user
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error("Failed to register user");
        return await response.json();
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

// Assign API methods to an object
const api = {
    fetchTasks,
    createTask,
    registerUser,
};

// Export the named variable as default
export default api;
