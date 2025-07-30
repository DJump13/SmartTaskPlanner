
const TaskList = ({ tasks, loading }) => {
    if(loading) return <p>Loading tasks...</p>;
    if(tasks.length === 0) return <p>No tasks found.</p>

    return (
        <ul>
            {tasks.map((task, index) => (
                <li key={task._id}>
                    {index + 1}. {task.title} – {task.priority}
                </li>
            ))}
        </ul>
    )
}

export default TaskList;