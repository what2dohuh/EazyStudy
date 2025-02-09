import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contex/user.context';
import { toast } from 'react-toastify';
import './GroupChat.css';

const GroupChatSection = () => {
    const [activeGroup, setActiveGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [groups, setGroups] = useState([])
    const {user} = useContext(UserContext)
    

    // Add new states for create group modal
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newGroup, setNewGroup] = useState({
        name: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, { text: newMessage, sender: 'You', time: new Date() }]);
            setNewMessage('');
        }
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8080/api/channel/create-channel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your auth token
                },
                body: JSON.stringify({
                    name: newGroup.name,
                    description: newGroup.description,
                    createdBy: user.id // Assuming you have user context
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Update the groups list with the new group
                setGroups(prevGroups => [...prevGroups, data]);
                
                // Reset form and close modal
                setNewGroup({ name: '', description: '' });
                setShowCreateModal(false);
                
                // Optional: Show success message
                toast.success('Group created successfully!');
            } else {
                setError(data.message || 'Failed to create group');
            }
        } catch (error) {
            setError('Network error occurred. Please try again.');
            console.error('Error creating group:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Add this function inside the GroupChatSection component
    const handleJoinGroup = async (groupId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/join-channel/${groupId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            
            if (response.ok) {
                // Update the groups list to reflect the new membership
                setGroups(prevGroups => 
                    prevGroups.map(group => 
                        group._id === groupId 
                            ? { ...group, isMember: true, memberCount: group.memberCount + 1 }
                            : group
                    )
                );
                toast.success('Successfully joined the group!');
            } else {
                toast.error(data.message || 'Failed to join group');
            }
        } catch (error) {
            console.error('Error joining group:', error);
            toast.error('Failed to join group. Please try again later.');
        }
    };

    // Add this before the return statement
    const CreateGroupModal = () => (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New Group</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleCreateGroup}>
                    <div className="form-group">
                        <label>Group Name:</label>
                        <input
                            type="text"
                            value={newGroup.name}
                            onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                            required
                                disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            value={newGroup.description}
                            onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="modal-buttons">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className={isLoading ? 'loading' : ''}
                        >
                            {isLoading ? 'Creating...' : 'Create'}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setShowCreateModal(false)}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    // Add this useEffect to fetch groups
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/channel/channels', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                
                if (response.ok) {
                    setGroups(data.channels);
                } else {
                    toast.error(data.message || 'Failed to fetch groups');
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
                toast.error('Failed to load groups. Please try again later.');
            }
        };

        fetchGroups();
    }, []); // Empty dependency array means this runs once when component mounts

    return (
        <div className="group-chat-container">
            <div className="groups-sidebar">
                <div className="groups-header">
                    <h3>Study Groups</h3>
                    <button 
                        className="create-group-btn"
                        onClick={() => setShowCreateModal(true)}
                    >
                        + Create Group
                    </button>
                </div>
                <div className="groups-list">
                    {groups.map((group) => (
                        <div 
                            key={group._id} // Update to use MongoDB _id
                            className={`group-item ${activeGroup?._id === group._id ? 'active' : ''}`}
                            onClick={() => setActiveGroup(group)}
                        >
                            <div className="group-info">
                                <h4>{group.name}</h4>
                                <p>{group.memberCount} members</p>
                            </div>
                            {!group.isMember ? (
                                <button 
                                    className="join-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleJoinGroup(group._id);
                                    }}
                                >
                                    Join
                                </button>
                            ) : (
                                <span className="joined-badge">Joined</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {activeGroup ? (
                <div className="chat-area">
                    <div className="chat-header">
                        <h3>{activeGroup.name}</h3>
                        <p>{activeGroup.description}</p>
                    </div>
                    <div className="messages-container">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
                                <span className="sender">{msg.sender}</span>
                                <p>{msg.text}</p>
                                <span className="time">
                                    {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="message-input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            ) : (
                <div className="no-group-selected">
                    <h3>Select a group to start chatting</h3>
                </div>
            )}

            {showCreateModal && <CreateGroupModal />}
        </div>
    );
};

export default GroupChatSection;