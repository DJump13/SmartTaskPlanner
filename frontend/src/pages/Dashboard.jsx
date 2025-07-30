import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import { fetchTasks, createTask, deleteTask } from '../utils/tasksAPI'

const Dashboard = () => {
    const navigate = useNavigate();
    
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const loadTasks = async () => {
        try {
            const tasksData = await fetchTasks();
            //console.log("Fetched tasks: ", tasksData);
            setTasks(tasksData.tasks);
            setLoading(false);
        } catch (error) {
            console.error(error);
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

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
            <h1>Your Tasks</h1>

            <TaskForm onSubmit={handleAddTask} />
            <TaskList tasks={tasks} loading={loading} handleDelete={handleDelete}/>
        </div>
    );
}

export default Dashboard;