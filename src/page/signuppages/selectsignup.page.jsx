import React from 'react';
import student from '../../assets/student.gif'
import tutor from '../../assets/tutor.gif'
import { Link } from 'react-router-dom';

const SelectsignupPage = () => {
    return (
        <div className='Slogin'>
            <h1>Signup as..</h1>
            <div className="container">
                <div className="box">
                    <h2>a student</h2>
                    <img src={student} ></img>
                    <p>Have lessons, message your tutor or watch your lessons back</p>
                    <Link to='/signup/student' ><button className='signuptutorbtn'>Login as student</button></Link>
                </div>
                <div className="box">
                <h2> a tutor</h2>
                    <img src={tutor} ></img>
                    <p>Give lessons or manage bookings with your customers</p>
                 <Link to='/signup/tutor'> <button className='studentbtn'>Login as tutor</button> </Link>
                </div>
            </div>
            <p>or if you have already joined us </p>
          <Link to='/login'>  <button className='loginbtnlog'>Login</button></Link>
        </div>
    );
}

export default SelectsignupPage;
