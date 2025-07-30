
const TaskList = ({ tasks, loading, handleDelete }) => {
    if(loading) return <p>Loading tasks...</p>;
    if(tasks.length === 0) return <p>No tasks found.</p>

    return (
        <ul>
            {tasks.map((task) => (
                <div key={task._id} className='task-item'>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>
            ))}
        </ul>
    )
}

export default TaskList;