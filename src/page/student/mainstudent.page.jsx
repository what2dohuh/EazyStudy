import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contex/user.context';
import { useNavigate } from 'react-router-dom';
import BannerfindtutorComponent from '../../components/bannerfindtutor.component';
import '../../style/mainstudentpage.d.css'
import StudentmessageComponent from '../../components/studentmessage.component';
import BookingstudentComponent from '../../components/bookingstudent.component';
const MainstudentPage = () => {
    const {user}  = useContext(UserContext)
    const nav = useNavigate()
    useEffect(() => {
        if(!user){
            nav('/')
        }
    }, [user]);
    return (
        <div className="main">
        <div className='studentmain'>  
        <h2>Welcome {user?.name}!!</h2>

            <BannerfindtutorComponent/>
            <div className="mix">
        <StudentmessageComponent key={user.id}/>
        <div className="mix2">
        <h3>Your Booking's</h3>
        <BookingstudentComponent/>
        </div>
            </div>
        </div>
        </div>
            
    );
}

export default MainstudentPage;
