import React, { useContext, useEffect, useState } from 'react';
import '../../style/login.d.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contex/user.context';

const LoginPage = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.type) {
            console.log(user);  
            navigate(`/home`);
        }
    }, [user, navigate]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password,
            });
            // Assuming the response contains a user object and a token
            const { user, token } = response.data;
            // Save the token and user information as needed
            // For example, you can save the token in localStorage
            localStorage.setItem('token', token);
            // Update the user state in the context
            setUser(user);
            // Navigate to the select page after successful login
            navigate('/select');

        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className='login'>
            <h2>Login</h2>
            <div className="container">
                <div className="box1">
                    <div className="box2">
                        <img src={`/src/assets/student.gif`} alt="Student" />
                        <p>Give lessons or manage bookings with your customers</p>
                    </div>
                    <div className="line"></div>
                    <div className="box2">
                        <h3>Welcome Back!!!</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Gmail</label>
                            <input
                                type="text"
                                placeholder="ect@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <button type="submit">Login</button>
                        </form>
                        <div className='forgot'>
                            <Link to="/forgot">Forgot Password?</Link>
                        </div>
                    </div>
                </div>
            </div>
            <p className='para'>Does not have an account?</p>
            <div className="btncre">
                <Link to='/signup'><button>Create account</button></Link>
            </div>
        </div>
    );
};

export default LoginPage;
