// src/components/Login/Login.js

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const updateUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const sentData = async () => {
        try {
            const response = await axios.post("http://localhost:3001/user", user); // Ensure the URL is correct
            console.log(response.data);
            // Handle successful login
            if (response.data.usertoken) {
                localStorage.setItem("usertoken", response.data.usertoken); // Save token if needed
                navigate('/Home'); // Navigate to Home on successful login
                alert('Welcome ' + user.username);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.'); // User feedback on failure
        }
    };

    return (
        <Box sx={{ width: '300px', margin: 'auto', paddingTop: '100px' }}>
            <h2>Login</h2>
            <TextField
                required
                label="Username"
                name='username'
                value={user.username}
                onChange={updateUser}
                fullWidth
            />
            <br /><br />
            <TextField
                label="Password"
                type="password"
                name='password'
                value={user.password}
                onChange={updateUser}
                fullWidth
            />
            <br /><br />
            <Button variant="outlined" onClick={sentData} sx={{ width: '100%' }}>Login</Button>
        </Box>
    );
};

export default Login;
