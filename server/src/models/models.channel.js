import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeacherApplication',  // Reference to the approved teacher
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  // Reference to users who joined
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;
