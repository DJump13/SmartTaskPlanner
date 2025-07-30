import { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import { editTask } from '../utils/tasksAPI';

const Task = ({ task, handleUpdate, handleDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

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
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {task.dueDate ? task.dueDate.slice(0, 10) : 'Not set'}</p>
            <p>Priority: {task.priority || "None"}</p>

            <button onClick={openModal}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>


            <EditTaskModal
                task={task}
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSave}
            />
        </div>
  );
}

export default Task;