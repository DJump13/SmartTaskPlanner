import { useState } from 'react';
import '../styles/TaskForm.css'; // Make sure to import the styles

const TaskForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return setError("Title is required");
        setError('');
        try {
            await onSubmit({
                ...formData,
                dueDate: formData.dueDate
                    ? new Date(formData.dueDate + 'T12:00:00')  // Add time to avoid timezone offset
                    : ''
            });
            setFormData({ title: '', description: '', dueDate: '', priority: '' });
        } catch {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="form-card">
            {error && <p className="form-error">{error}</p>}

            <form onSubmit={handleSubmit} className="form-content">
                <div className="form-group">
                    <label htmlFor="title">Title *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Optional details about the task"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="">Select priority (optional)</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="form-button">Add Task</button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
