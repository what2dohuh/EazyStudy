import express from 'express';
import TeacherApplication from '../models/models.TeacherApplication.js';
import authMiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

// 📌 Submit Teacher Application
router.post('/apply', authMiddleware, async (req, res) => {
    try {
        const { 
            name, 
            email, 
            subject, 
            experience, 
            qualifications, 
            documents, 
            expectedFee,
            aboutMe 
        } = req.body;

        // Check if user has already applied
        const existingApplication = await TeacherApplication.findOne({ email });
        if (existingApplication) {
            return res.status(400).json({ 
                success: false,
                message: "You have already applied. Please wait for approval." 
            });
        }

        // Validate expectedFee
        if (expectedFee < 0) {
            return res.status(400).json({
                success: false,
                message: "Expected fee cannot be negative"
            });
        }

        const application = new TeacherApplication({
            name,
            email,
            subject,
            experience: Number(experience),
            qualifications: Array.isArray(qualifications) ? qualifications : [qualifications],
            documents: Array.isArray(documents) ? documents : [documents],
            expectedFee: Number(expectedFee),
            aboutMe,
            status: 'pending'
        });

        await application.save();

        res.status(201).json({
            success: true,
            message: "Application submitted successfully. Waiting for approval.",
            application
        });

    } catch (error) {
        console.error('Application submission error:', error);
        res.status(500).json({ 
            success: false,
            message: "Failed to submit application", 
            error: error.message 
        });
    }
});


// 📌 Get Application Status (For Logged-in User)
router.get('/status', authMiddleware, async (req, res) => {
    try {
        const application = await TeacherApplication.findOne({ userId: req.user.id });

        if (!application) {
            return res.status(404).json({ message: "No application found." });
        }

        res.json({ status: application.status });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// 📌 Admin: Approve or Reject Application (Admin Only)
router.put('/review/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { status } = req.body;  // Should be 'approved' or 'rejected'
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: "Invalid status update." });
        }

        const application = await TeacherApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }

        application.status = status;
        await application.save();
        res.json({ message: `Application ${status} successfully.` });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.get('/approved-tutors', async (req, res) => {
    try {
        const approvedTutors = await TeacherApplication.find({ 
            status: 'approved' 
        }).select('-documents');

        if (!approvedTutors || approvedTutors.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No approved tutors found",
                tutors: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Approved tutors retrieved successfully",
            count: approvedTutors.length,
            tutors: approvedTutors
        });

    } catch (error) {
        console.error('Error fetching approved tutors:', error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching approved tutors", 
            error: error.message 
        });
    }
});

export default router;
