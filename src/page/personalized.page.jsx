import React, { useContext, useState } from 'react';
import { UserContext } from '../contex/user.context.jsx';
import { useNavigate } from 'react-router-dom';
import '../style/personaliedfeed.css';

const PersonalizedFeedPage = () => {
    const { user } = useContext(UserContext);
    const [visibleOptions, setVisibleOptions] = useState(12);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const navigate = useNavigate();

    const studyFields = [
        "MATHS", "JAVA", "C++", "Python", "DSA", "Javascript", "HTML", "CSS", "React",
        "Physics", "Chemistry", "Biology", "History", "Geography", "Economics", "Political Science",
        "Sociology", "Philosophy", "Psychology", "Art", "Music", "Dance", "Drama", "Literature",
        "Linguistics", "Anthropology", "Archaeology", "Astronomy", "Environmental Science", "Geology",
        "Meteorology", "Oceanography", "Zoology", "Botany", "Microbiology", "Genetics", "Biotechnology",
        "Engineering", "Medicine", "Nursing", "Pharmacy", "Dentistry", "Veterinary Science", "Law",
        "Business", "Accounting", "Finance", "Marketing", "Management", "Entrepreneurship"
    ];

    const handleLoadMore = () => {
        setVisibleOptions(prevVisibleOptions => prevVisibleOptions + 12);
    };

    const handleSelectOption = (field) => {
        setSelectedOptions(prevSelectedOptions => 
            prevSelectedOptions.includes(field) 
                ? prevSelectedOptions.filter(option => option !== field)
                : [...prevSelectedOptions, field]
        );
    };

    const handleNext = () => {
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
        navigate('/selected-feeds');
    };

    return (
        <div className="personalized-feed">
            <h1>Welcome {user?.name}!</h1>
            <p>Personalize your feed</p>
            <div className="options">
                {studyFields.slice(0, visibleOptions).map((field, index) => (
                    <React.Fragment key={index}>
                        {index === visibleOptions - 1 ? (
                            <div className="option load-more-option" onClick={handleLoadMore}>
                                <h2>+</h2>
                            </div>
                        ) : (
                            <div
                                className={`option ${selectedOptions.includes(field) ? 'selected' : ''}`}
                                onClick={() => handleSelectOption(field)}
                            >
                                <h2>{field}</h2>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
            <button className="next" onClick={handleNext}>Next</button>
        </div>
    );
}

export default PersonalizedFeedPage;