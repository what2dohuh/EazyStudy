import React, { useEffect, useState } from 'react';
import '../../style/login.d.css'
import { Link ,useNavigate  } from 'react-router-dom';

const LoginPage = ({k}) => {
    const [who, setwho] = useState('tutor');
    const [is, setis] = useState(false);
    useEffect(() => {
      setwho(k)
      setis(who==='tutor')
       
    }, [is]);

    return (
        <div className='login'>
            <h2>Login as a {who}</h2>
            <div className="container">
            <div className="box1">
                <div className="box2">
                    <img src={`/src/assets/${who}.gif`}/>
                    <p>Give lessons or manage bookings with your customers</p>
                </div>
                <div className="line"></div>
                <div className="box2">
                    <h3>Welcome Back!!!</h3>
                    <form>
                        <label>Gmail</label>
                        <input type="text" placeholder="ect@gmail.com" />
                        <label>Password</label>
                        <input type="password" placeholder="Password" />
                        <Link to={`/${who}/home`}>      <button type="submit">  Login</button></Link>
                    </form>
                       <div className='forgot'> <Link to="/forgot">Forgot Password?</Link></div>
                </div>
            </div>
            </div>
            <p className='para'>Does not have a account?   </p>
            <div className="btncre">

        <Link to='/signup'><button >Create account</button></Link>
            </div>
        </div>
    );
}

export default LoginPage;
