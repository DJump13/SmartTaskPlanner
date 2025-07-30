import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import LoginForm from "../components/LoginForm";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
        e.preventDefault();
        setError('');

        try {
            const res = await API.post('/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    }

    return(
        <LoginForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
        />
    )
}

export default Login;