import React, { useContext } from 'react';
import StudentmessageComponent from '../../components/studentmessage.component';
import { UserContext } from '../../contex/user.context';

const MessagestudentPage = () => {
    const {user} = useContext(UserContext);
    return (
        <div className="main">
        <div className='studentmain'>  
        <StudentmessageComponent key={user.id}/>
        </div>
        </div>
    );
}

export default MessagestudentPage;
