import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const containerStyle = {
        width: '100%',
        maxWidth: '400px',
        margin: '30px auto',
        textAlign: 'center',
        fontSize: '20px'
    };

    const textFieldStyle = {
        width: '100%',
        marginTop: '15px'
    };

    const buttonStyle = {
        width: '100%',
        marginTop: '15px',
        padding: '10px 0',
        fontSize: '18px'
    };

    return (
        <div style={containerStyle}>
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
                <TextField
                    style={textFieldStyle}
                    label="Email Address"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <TextField
                    style={textFieldStyle}
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />
                <Button style={buttonStyle} type="submit" variant="contained" color="primary">
                    Login
                </Button>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
};

export default LoginPage;
