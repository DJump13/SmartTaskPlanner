import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';
import { fetchTasks, createTask, deleteTask } from '../utils/tasksAPI'
import { groupTasksByStatus } from '../utils/groupTasks';

const Dashboard = () => {
    const navigate = useNavigate();
    
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const tasksData = await fetchTasks();
            setTasks(tasksData.tasks);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (taskData) => {
        try {
            await createTask(taskData);
            await loadTasks();
        } catch (error) {
            console.error("Failed to add task: ", error);
            throw error; //allow TaskForm to handle it too
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            await loadTasks();
        } catch (error) {
            console.error("Failed to delete task: ", error);
            alert("Error deleting task. Please try again.");
        }
    }

    const handleUpdate = (updatedTask) => {
        console.log("Task to update: ", updatedTask);
        setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            <br/>
            <TaskForm onSubmit={handleAddTask} />
            <br/>
            <h1>Your Tasks</h1>
            {loading ? (
                <p>Loading tasks...</p>  // Show this while fetching
            ) : (
                <>
                    {Object.entries(groupTasksByStatus(tasks)).map(([status, group]) => (
                        <div key={status}>
                            <h2>{status.toUpperCase()}</h2>
                            {group.length === 0 ? (
                                <p>No tasks</p>
                            ) : (
                            group.map((task) => (
                                <Task
                                    key={task._id}
                                    task={task}
                                    handleDelete={handleDelete}
                                    handleUpdate={handleUpdate}
                                />
                            ))
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default Dashboard;