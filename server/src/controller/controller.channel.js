import Channel from '../models/models.channel.js';

export const getAllChannels = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware

        const channels = await Channel.aggregate([
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    createdAt: 1,
                    memberCount: { $size: "$members" },
                    isMember: {
                        $in: [userId, "$members"]
                    },
                    creator: { $arrayElemAt: ["$creator", 0] },
                    lastActivity: 1
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

        return res.status(200).json({
            success: true,
            message: "Channels retrieved successfully",
            count: channels.length,
            channels: channels
        });

    } catch (error) {
        console.error('Error fetching channels:', error);
        return res.status(500).json({
            success: false,
            message: "Error fetching channels",
            error: error.message
        });
    }
};