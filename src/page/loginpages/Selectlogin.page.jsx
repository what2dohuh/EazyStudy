import React from 'react';
import '../../style/selectlogin.d.css'
import tutor from '../../assets/tutor.gif'
import student from '../../assets/student.gif'
import { Link } from 'react-router-dom'; 
const SelectLoginPage = () => {
    return (
        <div className='Slogin'>
            <h1>You want to..</h1>
            <div className="container">
                <div className="box">
                    <h2>Learn</h2>
                    <img src={student} ></img>
                    <p>Have lessons, message your tutor or watch your lessons back</p>
                    <Link to='/find' ><button className='studentbtn'>Learn</button></Link>
                </div>
                <div className="box">
                <h2> Teach</h2>
                    <img src={tutor} ></img>
                    <p>Give lessons or manage bookings with your customers</p>
                 <Link to='/teach'> <button>Teach</button> </Link>
                </div>
            </div>
            <p>or if you have not joined us </p>
          <Link to='/signup'>  <button className='signupbtnlog'>Join us</button></Link>
        </div>
    );
}

export default SelectLoginPage;
