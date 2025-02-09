import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contex/user.context.jsx';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaBriefcase, FaBook, FaArrowRight } from 'react-icons/fa';
import '../style/selectedfeed.css';

const SelectedFeedsPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || [];

    useEffect(() => {
        fetchSuggestions();
    }, []);

    const fetchSuggestions = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8080/api/interests/suggest-fields', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ interests: selectedOptions })
            });

            const data = await response.json();
            if (data.success) {
                setSuggestions(data.suggestions);
            }
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="selected-feeds">
            <h1>Welcome {user?.name}!</h1>
            <h2>Your Selected Interests</h2>
            
            <div className="interests-grid">
                {selectedOptions.map((field, index) => (
                    <div className="interest-tag" key={index}>
                        {field}
                    </div>
                ))}
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Analyzing your interests...</p>
                </div>
            ) : suggestions ? (
                <div className="suggestions-container">
                    <div className="suggestions-grid">
                        <div className="suggestion-card">
                            <div className="card-header">
                                <FaGraduationCap className="card-icon" />
                                <h3>Recommended Fields</h3>
                            </div>
                            <ul>
                                {suggestions.academicFields.map((field, index) => (
                                    <li key={index}>{field}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="suggestion-card">
                            <div className="card-header">
                                <FaBriefcase className="card-icon" />
                                <h3>Career Paths</h3>
                            </div>
                            <ul>
                                {suggestions.careerPaths.map((career, index) => (
                                    <li key={index}>{career}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="suggestion-card">
                            <div className="card-header">
                                <FaBook className="card-icon" />
                                <h3>Subjects to Study</h3>
                            </div>
                            <ul>
                                {suggestions.recommendedSubjects.map((subject, index) => (
                                    <li key={index}>{subject}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : null}

            <button className="next-button" onClick={() => navigate('/select')}>
                <span>Continue to Dashboard</span>
                <FaArrowRight />
            </button>
        </div>
    );
};

export default SelectedFeedsPage;