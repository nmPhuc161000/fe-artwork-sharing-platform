import React, { useState } from 'react';
import { TextInput,Icon } from 'react-materialize';
import './Login.css'
function Login() {
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Example validation (replace with your actual validation logic)
        if (username === 'admin' && password === 'admin123') {
            // Successful login
            alert('Login successful!');
            // Redirect to another page if needed
            // window.location.href = '/dashboard';
        } else {
            // Display error message
            setError('Invalid username or password');
        }
    };

    return (
        <div className='container'>
            <div className='tille'>Welcome to Artwork!</div>
            <div className='des'>please login to your accout</div>
            <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                <div className='group'>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='group'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"

                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <button type="submit">Login</button>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;