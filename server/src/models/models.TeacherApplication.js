import mongoose from 'mongoose';

const teacherApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    qualifications: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    documents: {
        type: [String],  // Array of document URLs
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const TeacherApplication = mongoose.model('TeacherApplication', teacherApplicationSchema);
export default TeacherApplication;
