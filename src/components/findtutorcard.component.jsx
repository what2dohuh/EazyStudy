import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaBookReader, FaClock, FaMedal } from 'react-icons/fa';

const FindtutorcardComponent = ({ tutor }) => {
    const navigate = useNavigate();

    const handleContactClick = () => {
        navigate(`/connect-tutor/${tutor._id}`, { 
            state: { 
                tutorName: tutor.name,
                tutorSubject: tutor.subject,
                tutorId: tutor._id
            }
        });
    };

    return (
        <div className="tutor-card">
            <div className="tutor-header">
                <div className="tutor-avatar">
                    {tutor.profilePic ? (
                        <img src={tutor.profilePic} alt={tutor.name} />
                    ) : (
                        <FaUserGraduate className="default-avatar" />
                    )}
                </div>
                <div className="tutor-info">
                    <h3>{tutor.name}</h3>
                    <span className="rating">⭐ {tutor.rating || '4.5'}</span>
                </div>
            </div>
            
            <div className="tutor-details">
                <div className="detail-item">
                    <FaBookReader className="icon" />
                    <p className="subject">{tutor.subject}</p>
                </div>
                <div className="detail-item">
                    <FaClock className="icon" />
                    <p className="experience">Experience: {tutor.experience}</p>
                </div>
                <div className="detail-item">
                    <FaMedal className="icon" />
                    <p className="qualifications">{tutor.qualifications}</p>
                </div>
            </div>
            
            <button className="contact-btn" onClick={handleContactClick}>
                Contact Tutor
            </button>
        </div>
    );
};

export default FindtutorcardComponent;
