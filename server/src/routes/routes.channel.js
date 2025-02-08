import express from 'express';
import authMiddleware from '../middleware/authmiddleware.js';
import TeacherApplication from '../models/models.TeacherApplication.js';
import Channel from '../models/models.channel.js';

const router = express.Router();

router.post('/create-channel', authMiddleware, async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.id; // Authenticated user

        // Check if user is an approved teacher
        const teacher = await TeacherApplication.findOne({ userId, status: 'approved' });
        if (!teacher) {
            return res.status(403).json({ message: "Only approved teachers can create channels." });
        }

        // Check if a channel with the same name exists
        const existingChannel = await Channel.findOne({ name });
        if (existingChannel) {
            return res.status(400).json({ message: "A channel with this name already exists." });
        }

        // Create the channel
        const channel = new Channel({
            name,
            description,
            createdBy: teacher._id, // Associate with the approved teacher
            members: [userId] // Add creator as the first member
        });

        await channel.save();
        res.status(201).json({ message: "Channel created successfully.", channel });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
router.post('/join-channel/:channelId', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Authenticated user ID
        const { channelId } = req.params; // Get channel ID from URL

        // Find the channel
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: "Channel not found." });
        }

        // Check if the user is already a member
        if (channel.members.includes(userId)) {
            return res.status(400).json({ message: "You are already a member of this channel." });
        }

        // Add the user to the channel members list
        channel.members.push(userId);
        await channel.save();

        res.status(200).json({ message: "You have successfully joined the channel.", channel });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


export default router;
