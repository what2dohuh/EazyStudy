export const webRTCConfig = {
    iceServers: [
        {
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302'
            ]
        }
        // Add TURN servers here if needed
    ],
    iceCandidatePoolSize: 10
};