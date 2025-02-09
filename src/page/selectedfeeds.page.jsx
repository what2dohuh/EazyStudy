import React, { useContext } from 'react';
import { UserContext } from '../contex/user.context.jsx';
import { useNavigate } from 'react-router-dom';
import '../style/selectedfeed.css';

const SelectedFeedsPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || [];

    const handleNext = () => {
        navigate('/login'); // or wherever you want to navigate
    };

    return (
        <div className="selected-feeds">
            <h1>{user?.name}Selected Feeds</h1>
            <div className="options">
                {selectedOptions.map((field, index) => (
                    <div className="option" key={index}>
                        <h2>{field}</h2>
                        <p>Description for {field}.</p>
                    </div>
                ))}
            <button className="next-button" onClick={handleNext}>
                <span>Continue to Dashboard</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            </div>
        </div>
    );
}

export default SelectedFeedsPage;