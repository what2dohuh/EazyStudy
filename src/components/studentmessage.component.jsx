import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contex/user.context';
import MessagecardComponent from './messagecard.component';
import GroupChatSection from './GroupChat/GroupChatSection';
import { Link, useLocation } from 'react-router-dom';
import { FaInbox, FaUsers, FaSearch } from 'react-icons/fa';
import '../style/studentMessage.css';

const StudentmessageComponent = () => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    const [isPath, setIsPath] = useState(false);
    const [activeTab, setActiveTab] = useState('messages');
    
    // Dummy messages data
    const dummyMessages = [
        {
            id: 1,
            tutorName: "John Smith",
            tutorId: "t123",
            subject: "Mathematics",
            lastMessage: "Let's schedule our next calculus session",
            timestamp: "2024-02-09T10:30:00",
            unread: 2,
            avatar: null
        },
        {
            id: 2,
            tutorName: "Emily Brown",
            tutorId: "t124",
            subject: "Physics",
            lastMessage: "Here's the solution to the quantum mechanics problem",
            timestamp: "2024-02-09T09:15:00",
            unread: 0,
            avatar: null
        },
        {
            id: 3,
            tutorName: "Michael Wong",
            tutorId: "t125",
            subject: "Computer Science",
            lastMessage: "Check out this algorithm implementation",
            timestamp: "2024-02-08T18:45:00",
            unread: 1,
            avatar: null
        }
    ];

    useEffect(() => {
        setIsPath(location.pathname === '/student/message');
    }, [location.pathname]);

    return (
        <div className="message-container">
            <div className="message-sidebar">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search messages..."
                        className="search-input"
                    />
                </div>

                <div className="tab-buttons">
                    <button 
                        className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('messages')}
                    >
                        <FaInbox /> Messages
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
                        onClick={() => setActiveTab('groups')}
                    >
                        <FaUsers /> Groups
                    </button>
                </div>
            </div>

            <div className="message-content">
                {activeTab === 'messages' ? (
                    <div className="messages-section">
                        <h2>Messages</h2>
                        <div className="message-list">
                            {(isPath ? dummyMessages : dummyMessages.slice(0, 3)).map((message) => (
                                <MessagecardComponent key={message.id} messages={message} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <GroupChatSection />
                )}
            </div>
        </div>
    );
};

export default StudentmessageComponent;
