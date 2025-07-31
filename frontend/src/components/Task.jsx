import { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import { editTask } from '../utils/tasksAPI';
import '../styles/Task.css'
import dayjs from 'dayjs';

const Task = ({ task, handleUpdate, handleDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const today = dayjs().startOf('day');
    const due = task.dueDate ? dayjs(task.dueDate).startOf('day') : null;

    let statusClass = 'status-upcoming';
    if (task.completed) statusClass = 'status-completed';
    else if (due && due.isBefore(today)) statusClass = 'status-overdue';
    else if (due && due.isSame(today)) statusClass = 'status-due-today';

    const handleSave = async (updatedFields) => {
        try {
            const res = await editTask(task._id, updatedFields);
            handleUpdate(res);
            closeModal();
        } catch (err) {
            console.error("Failed to update task", err);
        }
    }

    return (
        <div className={`task-card ${statusClass}`}>
            <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleUpdate({ ...task, completed: !task.completed })}
                />
            </div>

            <p className="task-desc">{task.description}</p>
            {task.dueDate && <p>Due: {dayjs(task.dueDate).format('MMM D, YYYY')}</p>}
            {task.priority && <p>Priority: {task.priority}</p>}

            <div className="task-footer">
                <div className="task-buttons">
                <button onClick={openModal}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
                {/* <button onClick={() => handleUpdate({ ...task, editing: true })}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button> */}

                <EditTaskModal
                    task={task}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={handleSave}
                />
                </div>
            </div>
        </div>
  );
}

export default Task;