import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.d.css';
import { Reorder } from '@mui/icons-material';
import { UserContext } from '../contex/user.context';

const NavabarComponent = () => {
    const [openLinks, setopenLinks] = useState(false);
    const [isTeacher, setisTeacher] = useState(false);
    const toggole = () => {
        setopenLinks(!openLinks);
    };
    const { user, setUser } = useContext(UserContext);
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };
    useEffect(() => {
        console.log(user);
        setisTeacher('tutor' === user?.type);
    }, [user]);

    return (
        <div className='navbar'>
            <div className='left' id={openLinks ? "open" : "close"}>
                <Link to='/'><h2>EazyStudy</h2></Link>
                <div className='hiddenLinks'>
                    <div className="bold">
                        <Link to='/signup/student'>Find a tutor</Link>
                    </div>
                    <Link to='/about'>{user ? "Home" : "About"}</Link>
                    <Link to={`/${user ? "" : "login"}`}>
                        <div onClick={handleLogout} className="btn">{user ? "Logout" : "Login"}</div>
                    </Link>
                </div>
            </div>
            <div className='right'>
                <Link to={`${user ? isTeacher ? '/tutor/home' : '/student/home' : '/about'}`}>{user ? "Home" : "About"}</Link>
                <div className="bold">
                    <Link to={`${user ? isTeacher ? '/tutor/message' : '/student/message' : ''}`}>{user ? "Message" : ""}</Link>
                </div>
                <Link to={`${user ? isTeacher ? '/tutor/payments' : '/student/payments' : ''}`}>{user ? "Payments" : ""}</Link>
                {!user && <Link to="/signup"><div className='btn'>Sign up</div></Link>}
                <Link to={`/${user ? "" : "login"}`}>
                    <div onClick={handleLogout} className="btn">{user ? "Logout" : "Login"}</div>
                </Link>
                <button className="on" onClick={toggole}>
                    <Reorder />
                </button>
            </div>
        </div>
    );
};

export default NavabarComponent;
