import React from 'react';
import { Link } from 'react-router-dom';
const SignupTutorPage = () => {
    return (
        <div className='studentsignup'>
        <h2>Signup As </h2> 
        <div className="containersignup">
        <div className="imgs">
            <img src='/src/assets/tutor.gif'/>
        </div>
            <div className="signupbox">
        <form>
        <h2>a tutor  </h2> 
            <label>Gmail</label>
            <input type="email" placeholder="Enter your Gmail"/>
            <label>Name</label>
            <input type="name" placeholder="Enter your legal name"/>
            <label>Password</label>
            <input type="password" placeholder="Enter your password"/>
            <label>Confirm password</label>
            <input type="password" placeholder="Confirm your password"/>
            <label>Phone number</label>
            <input type="number" placeholder="Enter your phone number"/>
            
            <button type="submit"> Join us</button>
            <p>Have a account already? <Link to="/login/student"> Login as student</Link></p>
        </form>
            </div>
        
        </div>
    </div>
    );
}

export default SignupTutorPage;
