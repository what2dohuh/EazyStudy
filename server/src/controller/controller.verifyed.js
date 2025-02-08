import TeacherApplication from '../models/models.TeacherApplication';

// 📌 Submit Teacher Application
export const applyForTeacher = async (req, res) => {
    try {
        const { name, email, subject, experience, qualifications, documents } = req.body;

        // Check if user has already applied
        const existingApplication = await TeacherApplication.findOne({ email });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied. Please wait for approval." });
        }

        const application = new TeacherApplication({
            name,
            email,
            subject,
            experience,
            qualifications,
            documents
        });

        await application.save();
        res.status(201).json({ message: "Application submitted successfully. Waiting for approval." });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// 📌 Get Application Status (For Logged-in User)
export const getApplicationStatus = async (req, res) => {
    try {
        const application = await TeacherApplication.findOne({ userId: req.user.id });

        if (!application) {
            return res.status(404).json({ message: "No application found." });
        }

        res.json({ status: application.status });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// 📌 Admin: Approve or Reject Application (Admin Only)
export const reviewApplication = async (req, res) => {
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
};
