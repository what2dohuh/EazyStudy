import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
<<<<<<< HEAD
import routes from './src/routes/routes.js';
=======
import routes from './src/routes/routes.auth.js';
import teacherRoutes from './src/routes/routes.verifed.js';
import channelRoutes from './src/routes/routes.channel.js';
>>>>>>> 489a09c (initial commit)
import connectDB from './src/config.js';

// Load environment variables
dotenv.config();
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', routes);
<<<<<<< HEAD
=======
app.use('/api/verifed', teacherRoutes);
app.use('/api/channel', channelRoutes);
>>>>>>> 489a09c (initial commit)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
