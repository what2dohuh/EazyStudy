import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../contex/user.context';
import '../style/teacherRegistration.css';

const FillRegistrationForTeach = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.user.name || '',
        email: user?.user.email || '',
        subject: '',
        experience: '',
        qualifications: '',
        documents: '',
        expectedFee: '',
        aboutMe: ''
    });

    // Add check for approved status
    useEffect(() => {
        const checkTeacherStatus = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch('http://localhost:8080/api/verifed/check-status', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();
                
                if (response.ok && data.status === 'approved') {
                    toast.info('You are already registered as a teacher');
                    navigate('/home');
                }
            } catch (error) {
                console.error('Error checking teacher status:', error);
            }
        };

        checkTeacherStatus();
    }, [navigate]);

    // Update form data when user context changes
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.user.name || '',
                email: user.user.email || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Handle qualifications as an array
        if (name === 'qualifications') {
            setFormData(prev => ({
                ...prev,
                [name]: value.split(',').map(qual => qual.trim())
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
            toast.error('Please login to submit application');
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/verifed/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    // Ensure qualifications is an array
                    qualifications: Array.isArray(formData.qualifications) 
                        ? formData.qualifications 
                        : formData.qualifications.split(',').map(qual => qual.trim()),
                    // Convert expectedFee to number
                    expectedFee: Number(formData.expectedFee)
                })
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Application submitted successfully!');
                navigate('/home');
            } else {
                if (response.status === 401) {
                    toast.error('Session expired. Please login again');
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    toast.error(result.message || 'Failed to submit application');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error submitting application. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="teacher-registration">
            <div className="registration-container">
                <h1>Become a Teacher</h1>
                <p className="subtitle">Share your knowledge with students worldwide</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            
                            className="input-disabled"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            
                            className="input-disabled"
                        />
                    </div>

                    <div className="form-group">
                        <label>Subject You Want to Teach</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Mathematics, Physics, Programming"
                        />
                    </div>

                    <div className="form-group">
                        <label>Years of Experience</label>
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                            min="0"
                            placeholder="Years of teaching experience"
                        />
                    </div>

                    <div className="form-group">
                        <label>Qualifications (Comma separated)</label>
                        <textarea
                            name="qualifications"
                            value={Array.isArray(formData.qualifications) ? formData.qualifications.join(', ') : formData.qualifications}
                            onChange={handleChange}
                            required
                            placeholder="e.g., B.Sc. Mathematics, M.Sc. Physics, Ph.D. Computer Science"
                        />
                        <small>Separate multiple qualifications with commas</small>
                    </div>

                    <div className="form-group">
                        <label>About Me</label>
                        <textarea
                            name="aboutMe"
                            value={formData.aboutMe}
                            onChange={handleChange}
                            required
                            maxLength={1000}
                            placeholder="Tell us about yourself and your teaching style"
                        />
                        <small>{1000 - (formData.aboutMe?.length || 0)} characters remaining</small>
                    </div>

                    <div className="form-group">
                        <label>Documents (Google Drive Links)</label>
                        <input
                            type="url"
                            name="documents"
                            value={formData.documents}
                            onChange={handleChange}
                            required
                            placeholder="Paste your Google Drive link here"
                        />
                        <small>Share your CV and certificates via Google Drive link (make sure it's publicly accessible)</small>
                    </div>

                    <div className="form-group">
                        <label>Expected Fee (per hour)</label>
                        <input
                            type="number"
                            name="expectedFee"
                            value={formData.expectedFee}
                            onChange={handleChange}
                            required
                            min="0"
                            placeholder="Enter your hourly rate"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`submit-btn ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FillRegistrationForTeach;