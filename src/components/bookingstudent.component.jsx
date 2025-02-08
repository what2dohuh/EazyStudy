import React from 'react';
import nomessage from '../assets/nomessage.gif';
import { Link } from 'react-router-dom';
const BookingstudentComponent = () => {
    return (
        <div>
            <div className="bookingshowbox">
                        <div className="showupcoming">
                            <div className="titleup">
                            <h4 > Upcoming</h4>
                            <h4>Previous</h4>
                            </div>
                            <hr/>
                        </div>
                        <div className="showallinfo">
                            {/* <div className="card">
                                <img src='https://via.placeholder.com/150' alt='tutor'/>
                                <div className="card-body">
                                    <h5 className="card-title">Tutor Name</h5>
                                    <p className="card-text">Course: Mathematics</p>
                                    <p className="card-text">Date: 2022-01-01</p>
                                    <p className="card-text">Status: Awaiting Confirmation</p>
                                    <p className="card-text">Payment: $500</p>
                                </div>
                            </div>
                            <div className="card">
                                <img src='https://via.placeholder.com/150' alt='tutor'/>
                                <div className="card-body">
                                    <h5 className="card-title">Tutor Name</h5>
                                    <p className="card-text">Course: Mathematics</p>
                                    <p className="card-text">Date: 2022-01-01</p>
                                    <p className="card-text">Status: Awaiting Confirmation</p>
                                    <p className="card-text">Payment: $500</p>
                                </div>
                            </div> */}
                            <img src={nomessage}/>
                            <p>Find best sutable tutor at affordable price. Find your tutor now!</p>
                            <Link to='/student/findtutor'><button className='btnfind'>Find tutor</button></Link>
                            
                        </div>
                    </div>
        </div>
    );
}

export default BookingstudentComponent;
