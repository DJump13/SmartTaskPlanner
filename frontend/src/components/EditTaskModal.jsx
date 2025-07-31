import { useState, useEffect } from 'react';
import '../styles/EditTaskModal.css'; // optional: external CSS

const EditTaskModal = ({ task, isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
            setPriority(task.priority || '');
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const normalizedDueDate = dueDate
            ? new Date(dueDate + 'T12:00:00')
            : '';

        onSave({ title, description, dueDate: normalizedDueDate, priority });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h2>Edit Task</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <label>
                        Title *
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            placeholder="Optional"
                        />
                    </label>

                    <label>
                        Due Date
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </label>

                    <label>
                        Priority
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>

                    <div className="modal-buttons">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;
