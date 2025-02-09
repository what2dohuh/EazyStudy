import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import routes from './src/routes/routes.auth.js';
import teacherRoutes from './src/routes/routes.verifed.js';
import channelRoutes from './src/routes/routes.channel.js';
import interestRoutes from './src/routes/routes.interests.js';
import connectDB from './src/config.js';

// Load environment variables
dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

const PORT = 8080;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// WebRTC Room Management
const rooms = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', ({ roomId, userName }) => {
        socket.join(roomId);
        
        if (!rooms.has(roomId)) {
            rooms.set(roomId, new Set());
        }
        rooms.get(roomId).add(socket.id);

        // Notify others in the room
        socket.to(roomId).emit('user-connected', {
            userId: socket.id,
            userName
        });

        console.log(`${userName} joined room ${roomId}`);
    });

    // Handle WebRTC signaling
    socket.on('offer', ({ offer, roomId, targetId }) => {
        socket.to(targetId).emit('offer', {
            offer,
            from: socket.id
        });
    });

    socket.on('answer', ({ answer, roomId, targetId }) => {
        socket.to(targetId).emit('answer', {
            answer,
            from: socket.id
        });
    });

    socket.on('ice-candidate', ({ candidate, roomId, targetId }) => {
        socket.to(targetId).emit('ice-candidate', {
            candidate,
            from: socket.id
        });
    });

    socket.on('disconnect', () => {
        // Remove user from all rooms they were in
        rooms.forEach((users, roomId) => {
            if (users.has(socket.id)) {
                users.delete(socket.id);
                io.to(roomId).emit('user-disconnected', socket.id);
                
                // Clean up empty rooms
                if (users.size === 0) {
                    rooms.delete(roomId);
                }
            }
        });
        console.log('User disconnected:', socket.id);
    });
});

// Routes
app.use('/api', routes);
app.use('/api/verifed', teacherRoutes);
app.use('/api/channel', channelRoutes);
app.use('/api/interests', interestRoutes);

// Start server with WebSocket support
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
