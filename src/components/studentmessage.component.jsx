import React, { useContext, useEffect, useState } from 'react';
import nomessages from '../assets/nomessage.gif'
import { UserContext } from '../contex/user.context';
import MessagecardComponent from './messagecard.component';
import { Link, useLocation } from 'react-router-dom';
const StudentmessageComponent = () => {
    const {user} = useContext(UserContext);
    const location = useLocation();
    const [isPath, setisPath] = useState('');
    console.log(location.pathname)
    useEffect(() => {
        setisPath(location.pathname === '/student/message')
    }, [location.pathname])
    return (
        <div className="mainmessages">
            <div className="upbox">

         <h3>Messages</h3>
        <Link to={`/${user.type}/message`}><h5 style={{marginTop:'15px'}}>View all messages</h5></Link>
            </div>
        <div className='studentmessagemain'>
            <div className="messages">
        {user.messages ? <div className="message">{isPath ? user.messages.map((mss)=>{return <MessagecardComponent key={mss.id} messages={mss}/>}) : user.messages.slice(0, 3).map((mss)=>{return <MessagecardComponent key={mss.id} messages={mss}/>})}</div> : <><img src={nomessages}/> <Link to='/student/findtutor'><button className='btnfind'>Find tutor</button></Link></>}
      <hr/>
          
            </div>
            
        </div>
        </div>

    );
}

export default StudentmessageComponent;
