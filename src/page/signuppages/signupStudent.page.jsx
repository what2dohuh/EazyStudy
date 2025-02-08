import React from 'react';
import '../../style/signupStudent.d.css'
import {Link} from 'react-router-dom'
const SignupStudentPage = () => {
    return (
        <div className='studentsignup'>
            <h2>Signup As </h2> 
            <div className="containersignup">
                <div className="signupbox">
            <form>
            <h2>a student  </h2> 
                <label>Gmail</label>
                <input type="email" placeholder="Enter your Gmail"/>
                <label>Name</label>
                <input type="name" placeholder="Enter your name"/>
                <label>Password</label>
                <input type="password" placeholder="Enter your password"/>
                <label>Confirm password</label>
                <input type="password" placeholder="Confirm your password"/>
                <button type="submit"> Join us</button>
                <p>Have a account already? <Link to="/login/tutor">Login as tutor</Link></p>
            </form>
                </div>
            <div className="imgs">
                <img src='/src/assets/student.gif'/>
            </div>
            </div>
        </div>
    );
}

export default SignupStudentPage;
