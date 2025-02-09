import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import nomessage from '../assets/nomessage.gif';

const BookingstudentComponent = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    
    const dummyBookings = {
        upcoming: [
            {
                id: 1,
                tutorName: "Dr. Sarah Wilson",
                subject: "Mathematics",
                topic: "Calculus",
                date: "2024-02-15",
                time: "14:00",
                status: "Confirmed",
                payment: 45,
                avatar: null
            },
            {
                id: 2,
                tutorName: "Prof. John Davis",
                subject: "Physics",
                topic: "Quantum Mechanics",
                date: "2024-02-18",
                time: "16:30",
                status: "Pending",
                payment: 50,
                avatar: null
            }
        ],
        previous: [
            {
                id: 3,
                tutorName: "Dr. Michael Chang",
                subject: "Chemistry",
                topic: "Organic Chemistry",
                date: "2024-02-01",
                time: "10:00",
                status: "Completed",
                payment: 40,
                avatar: null
            }
        ]
    };

    return (
        <div className="booking-container">
            <div className="bookingshowbox">
                <div className="showupcoming">
                    <div className="titleup">
                        <h4 
                            className={`tab-title ${activeTab === 'upcoming' ? 'active' : ''}`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            Upcoming Sessions
                        </h4>
                        <h4 
                            className={`tab-title ${activeTab === 'previous' ? 'active' : ''}`}
                            onClick={() => setActiveTab('previous')}
                        >
                            Previous Sessions
                        </h4>
                    </div>
                </div>
                <div className="showallinfo">
                    {dummyBookings[activeTab].length > 0 ? (
                        dummyBookings[activeTab].map(booking => (
                            <div key={booking.id} className="booking-card">
                                <div className="tutor-info">
                                    {booking.avatar ? (
                                        <img src={booking.avatar} alt={booking.tutorName} />
                                    ) : (
                                        <FaUserCircle className="default-avatar" />
                                    )}
                                    <div>
                                        <h5>{booking.tutorName}</h5>
                                        <p>{booking.subject} - {booking.topic}</p>
                                    </div>
                                </div>
                                <div className="booking-details">
                                    <div className="detail-item">
                                        <FaClock />
                                        <span>{new Date(booking.date).toLocaleDateString()} at {booking.time}</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className={`status ${booking.status.toLowerCase()}`}>
                                            {booking.status === 'Confirmed' && <FaCheck />}
                                            {booking.status === 'Pending' && <FaClock />}
                                            {booking.status === 'Completed' && <FaCheck />}
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="price">${booking.payment}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-bookings">
                            <img src={nomessage} alt="No bookings" />
                            <p>Find best suitable tutor at affordable price. Find your tutor now!</p>
                            <Link to='/student/findtutor'>
                                <button className='btnfind'>Find tutor</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookingstudentComponent;
