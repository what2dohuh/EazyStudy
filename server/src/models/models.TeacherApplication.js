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
        required: false
    },
    expectedFee: {
        type: Number,
        required: true,
        min: 0
    },
    aboutMe: {
        type: String,
        required: true,
        maxLength: 1000
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add a pre-save middleware to validate expectedFee
teacherApplicationSchema.pre('save', function(next) {
    if (this.expectedFee < 0) {
        next(new Error('Expected fee cannot be negative'));
    }
    next();
});

const TeacherApplication = mongoose.model('TeacherApplication', teacherApplicationSchema);
export default TeacherApplication;
