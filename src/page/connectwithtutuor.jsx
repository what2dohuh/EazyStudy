import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { UserContext } from '../contex/user.context';
import { FiPaperclip, FiSend } from 'react-icons/fi';
import '../style/connectWithTutor.css';

const ConnectWithTutor = () => {
    const { tutorId } = useParams();
    const location = useLocation();
    const { user } = useContext(UserContext);
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    
    // Get tutor info from location state
    const tutorName = location.state?.tutorName || 'Unknown Tutor';
    const subject = location.state?.subject || 'Subject';
    const tutorInitials = tutorName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();

    useEffect(() => {
        // Connect to Socket.IO server
        const newSocket = io('http://localhost:8080', {
            auth: {
                token: localStorage.getItem('token')
            }
        });

        newSocket.on('connect', () => {
            setIsConnected(true);
            console.log('Connected to socket server');
            
            // Join the chat room
            newSocket.emit('join-room', {
                tutorId,
                studentId: user.id
            });
        });

        newSocket.on('receive-message', (message) => {
            setChats(prevChats => [...prevChats, message]);
        });

        newSocket.on('previous-messages', (messages) => {
            setChats(messages);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [tutorId, user.id]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim() || !socket) return;

        const newMessage = {
            id: Date.now(),
            sender: 'student',
            name: user.name,
            message: message,
            timestamp: new Date().toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        };

        socket.emit('send-message', {
            ...newMessage,
            tutorId,
            studentId: user.id
        });

        setChats(prevChats => [...prevChats, newMessage]);
        setMessage('');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !socket) return;

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            const { fileUrl } = await response.json();

            const newMessage = {
                id: Date.now(),
                sender: 'student',
                name: user.name,
                message: `Shared a file: ${file.name}`,
                attachment: fileUrl,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            socket.emit('send-message', {
                ...newMessage,
                tutorId,
                studentId: user.id
            });

            setChats(prevChats => [...prevChats, newMessage]);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="tutor-info">
                    <div className="tutor-avatar">{tutorInitials}</div>
                    <div className="tutor-details">
                        <h2>{tutorName}</h2>
                        <span>{subject} Tutor</span>
                    </div>
                </div>
            </div>

            <div className="chat-messages">
                {chats.map((chat) => (
                    <div 
                        key={chat.id} 
                        className={`message ${chat.sender === 'student' ? 'sent' : 'received'}`}
                    >
                        <div className="message-content">
                            {chat.message}
                            {chat.attachment && (
                                <div className="attachment">
                                    <FiPaperclip />
                                    <span>{chat.attachment}</span>
                                </div>
                            )}
                        </div>
                        <div className="message-info">
                            <span className="timestamp">{chat.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>

            <form className="chat-input" onSubmit={handleSend}>
                <input 
                    type="file" 
                    id="file-upload" 
                    hidden 
                    onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" className="attach-button">
                    <FiPaperclip />
                </label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">
                    <FiSend />
                </button>
            </form>
        </div>
    );
};

export default ConnectWithTutor;