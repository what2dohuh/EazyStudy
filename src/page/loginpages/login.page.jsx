import React, { useContext, useEffect, useState } from 'react';
import '../../style/login.d.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contex/user.context';
import Cookies from 'js-cookie';

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
            const response = await axios.post('http://localhost:8080/api/login', 
                {
                    email,
                    password,
                }, 
                {   withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            // Get the token from cookies
            const token = Cookies.get('token');
            console.log('Token from cookie:', token);
            localStorage.setItem('token', response.data.token);
            // Update the user state in the context
            setUser(response.data);
            navigate('/select');

        } catch (err) {
            setError('Login failed. Please try again.: ' + err);
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
