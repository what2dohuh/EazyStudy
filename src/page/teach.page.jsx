import React, { useState, useContext } from 'react';
import { UserContext } from '../contex/user.context';
import FillRegistrationForTeach from '../components/fillregistrationforteach';
import '../style/teach.d.css';

const TeachPage = () => {
    const { user } = useContext(UserContext);
    const [isRegistered, setIsRegistered] = useState(false);

    return (
        <div className="teach-page">
            {!isRegistered ? (
                <div className="registration-section">
                    <FillRegistrationForTeach onSuccess={() => setIsRegistered(true)} />
                </div>
            ) : (
                <div className="success-message">
                    <h2>Application Submitted!</h2>
                    <p>We'll review your application and get back to you soon.</p>
                </div>
            )}
        </div>
    );
};

export default TeachPage;