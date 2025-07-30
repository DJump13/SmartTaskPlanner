import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent page from reloading
        setError('');   //clear any previous errors

        try {
            const res = await API.post('/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    }

    return (
        <RegisterForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
        />
  );
}

export default Register;