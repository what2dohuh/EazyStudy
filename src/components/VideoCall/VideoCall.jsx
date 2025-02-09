import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import './VideoCall.css';

const VideoCall = () => {
    const { tutorId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);

    const handleEndCall = () => {
        navigate(-1);
    };

    return (
        <div className="video-call-container">
            <div className="video-header">
                <h2>Call with {location.state?.tutorName}</h2>
                <p>{location.state?.subject}</p>
            </div>
            
            <div className="video-grid">
                <div className="video-participant tutor">
                    <div className="video-placeholder">
                        <span>{location.state?.tutorName?.[0]}</span>
                    </div>
                </div>
                <div className="video-participant self">
                    <div className="video-placeholder">
                        <span>You</span>
                    </div>
                </div>
            </div>

            <div className="video-controls">
                <button 
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                    className={`control-btn ${!isAudioEnabled ? 'disabled' : ''}`}
                >
                    {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>
                <button 
                    onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                    className={`control-btn ${!isVideoEnabled ? 'disabled' : ''}`}
                >
                    {isVideoEnabled ? <FaVideo /> : <FaVideoSlash />}
                </button>
                <button 
                    onClick={handleEndCall}
                    className="control-btn end-call"
                >
                    <FaPhoneSlash />
                </button>
            </div>
        </div>
    );
};

export default VideoCall;