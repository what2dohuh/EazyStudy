import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaVideo, FaComment } from 'react-icons/fa';

const MessagecardComponent = ({ messages }) => {
    const navigate = useNavigate();
    
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleClick = () => {
        navigate(`/connect-tutor/${messages.tutorId}`, {
            state: {
                tutorName: messages.tutorName,
                subject: messages.subject
            }
        });
    };

    const handleVideoCall = (e) => {
        e.stopPropagation(); // Prevent triggering the card click
        navigate(`/video-call/${messages.tutorId}`, {
            state: {
                tutorName: messages.tutorName,
                subject: messages.subject
            }
        });
    };

    return (
        <div className="message-card" onClick={handleClick}>
            <div className="message-avatar">
                {messages.avatar ? (
                    <img src={messages.avatar} alt={messages.tutorName} />
                ) : (
                    <FaUserCircle className="default-avatar" />
                )}
                {messages.unread > 0 && (
                    <span className="unread-badge">{messages.unread}</span>
                )}
            </div>
            <div className="message-info">
                <div className="message-header">
                    <h4>{messages.tutorName}</h4>
                    <span className="timestamp">{formatTimestamp(messages.timestamp)}</span>
                </div>
                <p className="subject">{messages.subject}</p>
                <p className="last-message">{messages.lastMessage}</p>
            </div>
            <div className="message-actions">
                <button 
                    className="action-btn chat"
                    onClick={handleClick}
                    title="Open Chat"
                >
                    <FaComment />
                </button>
                <button 
                    className="action-btn video"
                    onClick={handleVideoCall}
                    title="Start Video Call"
                >
                    <FaVideo />
                </button>
            </div>
        </div>
    );
};

export default MessagecardComponent;
