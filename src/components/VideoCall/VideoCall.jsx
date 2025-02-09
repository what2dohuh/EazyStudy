import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import io from 'socket.io-client';
import './VideoCall.css';

const VideoCall = () => {
    const { tutorId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const socketRef = useRef(null);

    const iceServers = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
        ]
    };

    useEffect(() => {
        socketRef.current = io('http://localhost:8080');
        
        const initCall = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                // Create RTCPeerConnection
                peerConnectionRef.current = new RTCPeerConnection(iceServers);

                // Add local stream to peer connection
                stream.getTracks().forEach(track => {
                    peerConnectionRef.current.addTrack(track, stream);
                });

                // Handle incoming remote stream
                peerConnectionRef.current.ontrack = (event) => {
                    setRemoteStream(event.streams[0]);
                    if (remoteVideoRef.current) {
                        remoteVideoRef.current.srcObject = event.streams[0];
                    }
                };

                // Socket event handlers
                socketRef.current.emit('join-room', { roomId: tutorId });

                socketRef.current.on('user-connected', async () => {
                    const offer = await peerConnectionRef.current.createOffer();
                    await peerConnectionRef.current.setLocalDescription(offer);
                    socketRef.current.emit('offer', { offer, roomId: tutorId });
                });

                socketRef.current.on('offer', async (offer) => {
                    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
                    const answer = await peerConnectionRef.current.createAnswer();
                    await peerConnectionRef.current.setLocalDescription(answer);
                    socketRef.current.emit('answer', { answer, roomId: tutorId });
                });

                socketRef.current.on('answer', async (answer) => {
                    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
                });

                socketRef.current.on('ice-candidate', async (candidate) => {
                    await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                });

                peerConnectionRef.current.onicecandidate = (event) => {
                    if (event.candidate) {
                        socketRef.current.emit('ice-candidate', {
                            candidate: event.candidate,
                            roomId: tutorId
                        });
                    }
                };

            } catch (error) {
                console.error('Error starting video call:', error);
                setVideoEnabled(false);
            }
        };

        initCall();

        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            if (peerConnectionRef.current) {
                peerConnectionRef.current.close();
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [tutorId]);

    const handleEndCall = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        navigate(-1);
    };

    const toggleAudio = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !isAudioEnabled;
                setIsAudioEnabled(!isAudioEnabled);
            }
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !isVideoEnabled;
                setIsVideoEnabled(!isVideoEnabled);
            }
        }
    };

    return (
        <div className="video-call-container">
            <div className="video-header">
                <h2>Call with {location.state?.tutorName}</h2>
                <p>{location.state?.subject}</p>
            </div>
            
            <div className="video-grid">
                <div className="video-participant remote">
                    {remoteStream ? (
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="video-stream"
                        />
                    ) : (
                        <div className="video-placeholder">
                            <span>{location.state?.tutorName?.[0]}</span>
                        </div>
                    )}
                </div>
                <div className="video-participant local">
                    {isVideoEnabled ? (
                        <video
                            ref={localVideoRef}
                            autoPlay
                            playsInline
                            muted
                            className="video-stream"
                        />
                    ) : (
                        <div className="video-placeholder">
                            <span>You</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="video-controls">
                <button 
                    onClick={toggleAudio}
                    className={`control-btn ${!isAudioEnabled ? 'disabled' : ''}`}
                >
                    {isAudioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
                </button>
                <button 
                    onClick={toggleVideo}
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