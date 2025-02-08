import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.d.css'
import { Reorder } from '@mui/icons-material';
import { UserContext } from '../contex/user.context';
const NavabarComponent = () => {
    const [openLinks, setopenLinks] = useState(false);
    const [isTeacher, setisTeacher] = useState(false);
    const toggole=()=>{
        setopenLinks(!openLinks)
    }
    const {user,setUser} = useContext(UserContext)
    const handleLogout = ()=>{
        setUser(null)
        // localStorage.removeItem('token')
    }
    useEffect(() => {
        setisTeacher('tutor' === user?.type)
    }, [user]);
    return (
        <div className='navbar'>
            <div className='left' id={openLinks ? "open":"close"}>
                <Link to='/'><h2>EazyStudy</h2></Link>
            <div className='hiddenLinks'>
            <div className=" bold">
            <Link to='/signup/student'>Find a tutor</Link>
                </div>
            <Link to='/about'>{user ?"Home":"About"}</Link>
            <div className=" bold">
            <Link to='/signup/tutor'>{user?"Book a tutor":"Become a tutor"}</Link>
                </div>
                <Link to={`/${user ? "": "login"}`}> <div onClick={handleLogout} className="btn">{user ? "Logout ": "login"} </div></Link>
            </div>
            </div>
            <div className='right'>
                <div className=" bold">
            <Link to={`${user ? isTeacher ? '/tutor/findastudent' : '/student/findatutor' : '/signup/student'}`}>{user ? isTeacher ? 'Find a student' : 'Find a tutor' : 'Find a tutor'}</Link>
                </div>
                <Link to={`${user ? isTeacher ? '/tutor/home' : '/student/home' : '/about'}`}>{user ? isTeacher ? 'Home' : 'Home' : 'About'}</Link>
            <div className=" bold">
            <Link to={`${user ? isTeacher ? '/tutor/booking' : '/student/booking' : '/signup/tutor'}`}>{`${user ? isTeacher ? 'Booking' : 'Bookings' : 'Become a tutor'}`}</Link>
            <Link to={`${user ? isTeacher ? '/tutor/message' : '/student/message' : ''}`}>{user?"Message":""}</Link>
                </div>
            <Link to={`${user ? isTeacher ? '/tutor/payments' : '/student/payments' : ''}`}>{user?"Payments":""}</Link>
                <Link to={`/${user ? "": "login"}`}> <div onClick={handleLogout} className="btn">{user ? "Logout ": "login"} </div></Link>
            
            <button className="on"onClick={toggole}>
            <Reorder/>
            </button >
            </div>
        </div>
    );
}

export default NavabarComponent;
