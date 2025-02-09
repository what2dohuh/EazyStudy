import React, { useState, useEffect } from 'react';
import FindtutorcardComponent from '../../components/findtutorcard.component';
import '../../style/findatutor.d.css';
import BannerfindtutorComponent from '../../components/bannerfindtutor.component';
import axios from 'axios';

const FindatutorPage = () => {
    const [tutors, setTutors] = useState([]);
    const [filteredTutors, setFilteredTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/verifed/approved-tutors', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    setTutors(response.data.tutors);
                    setFilteredTutors(response.data.tutors);
                }
            } catch (err) {
                setError('Failed to fetch tutors: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTutors();
    }, []);

    const handleFilter = (filters) => {
        const filtered = tutors.filter(tutor => {
            const subjectMatch = !filters.subject || tutor.subject === filters.subject;
            const levelMatch = !filters.level || tutor.level === filters.level;
            return subjectMatch && levelMatch;
        });
        setFilteredTutors(filtered);
    };

    return (
        <div className='mainfindtutor'>
            <h2>Find tutor</h2>
            <div className="findtutorbox">
                <BannerfindtutorComponent onFilter={handleFilter}/>
                
                <h2>Available Tutors</h2>

                {loading ? (
                    <div className="loading">Loading tutors...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <div className="showlisttutor">
                        {filteredTutors.length > 0 ? (
                            filteredTutors.map((tutor) => (
                                <FindtutorcardComponent 
                                    key={tutor._id}
                                    tutor={tutor}
                                />
                            ))
                        ) : (
                            <div className="no-tutors">
                                No tutors found matching your criteria.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindatutorPage;
