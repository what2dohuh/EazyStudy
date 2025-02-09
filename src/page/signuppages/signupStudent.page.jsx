import React, { useState } from 'react';
import '../../style/signupStudent.d.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupStudentPage = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                email,
                name,
                password
            });
            setSuccess('Signup successful!');
            setError('');
            navigate('/personalized-feed'); 
        } catch (err) {
            setError('Signup failed. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className='studentsignup'>
            <h2>Signup</h2>
            <div className="containersignup">
                <div className="signupbox">
                    <form onSubmit={handleSubmit}>
                        <h2>Welcome...</h2>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <label>Gmail</label>
                        <input
                            type="email"
                            placeholder="Enter your Gmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Confirm password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type="submit">Join us</button>
                        <p>Have an account already? <Link to="/login">Login as tutor</Link></p>
                    </form>
                </div>
                <div className="imgs">
                    <img src='/src/assets/student.gif' alt="Student"/>
                </div>
            </div>
        </div>
    );
}

export default SignupStudentPage;
