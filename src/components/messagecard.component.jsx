import React from 'react';

const MessagecardComponent = ({messages}) => {
    return (
        <div className='messagecard'>
            <img src={messages.photo}/>
            <div className="messagecardbox">
            <h4>From: {messages.name}</h4>

           <h5> {messages.mes}</h5>
            <p>{new Date(messages.date).toLocaleString()}</p>
            <button>Reply</button>

          
            </div>
        </div>
    );
}

export default MessagecardComponent;
