import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Task from '../components/Task';
import TaskForm from '../components/TaskForm';
import { fetchTasks, createTask, editTask, deleteTask } from '../utils/tasksAPI'
import { groupTasksByStatus } from '../utils/groupTasks';
import '../styles/Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();
    
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const priorityRank = {
        high: 3,
        medium: 2,
        low: 1,
        "": 0, // no priority
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const toggleForm = () => {
        setShowForm(prev => !prev);
    }

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
            toggleForm();
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

    const handleUpdate = async (updatedTask) => {
        try {
            const savedTask = await editTask(updatedTask._id, updatedTask);
            setTasks(prev =>
                prev.map(task => (task._id === savedTask._id ? savedTask : task))
            );
        } catch (err) {
            console.error("Error updating task:", err);
            alert("Failed to update task");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className='dashboard-container'>
            <h1>Smart Task Planner</h1>
            <button onClick={handleLogout}>Logout</button>
            <br />
            <button onClick={toggleForm}>
                {showForm ? "Cancel" : "Add New Task"}
            </button>

            {showForm && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>Add New Task</h2>
                        <TaskForm onSubmit={handleAddTask} />
                        <button onClick={toggleForm}>Cancel</button>
                    </div>
                </div>
            )}

            <h1>Your Tasks</h1>
            {loading ? (
            <p>Loading tasks...</p>
            ) : (
                <div className="task-columns-container" style={{ display: 'flex', gap: '1rem' }}>
                    {Object.entries(groupTasksByStatus(tasks)).map(([status, group]) => {
                        const sortedGroup = [...group].sort((a, b) => {
                            return (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0);
                        });

                        return (
                            <div
                                key={status}
                                className="task-section"
                                style={{ flex: 1, minWidth: '250px' }}
                            >
                                <h2 className="section-header">{status.toUpperCase()}</h2>
                                {sortedGroup.length === 0 ? (
                                    <p>No tasks</p>
                                ) : (
                                    sortedGroup.map((task) => (
                                        <Task
                                            key={task._id}
                                            task={task}
                                            handleDelete={handleDelete}
                                            handleUpdate={handleUpdate}
                                        />
                                    ))
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Dashboard;