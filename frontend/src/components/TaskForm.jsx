import { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: '' //empty string means no priority set
    })
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await onSubmit(formData);
            setFormData({ title: '', description: '', dueDate: '', priority: ''});
        } catch {
            setError("Something went wrong. Please try again.")
        }
    }

    return (
        <>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
            <div>
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

            <div>
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

            <div>
                <label htmlFor="dueDate">Due Date</label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                />
            </div>

            <div>
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


            <button type="submit">Add Task</button>
        </form>
        </>
        
    )
}

export default TaskForm;