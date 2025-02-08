import React from 'react';
import '../style/home.d.css'
import myGif from '../assets/forum.png'
import { Link } from 'react-router-dom';
const ResforumComponent = () => {
    return (
        <>
            <h1 className='forum'>Forum</h1>
        <div className='home'>
            <div className="headerContainer">
       <img src={myGif}/>
            </div>
            <div className="headerContainer">
                <h1>Unlock  all the free resources and ask doubts</h1>
              <p>Join our vibrant online forum to unlock a wealth of free resources and get your questions answered. Whether you need help with homework, want to dive deeper into a subject, or share your knowledge with others, our community is here to support you. Connect with peers, access study materials, and clear your doubts in a collaborative environment designed to help you succeed academically. Sign up today and start exploring the endless learning opportunities available at your fingertips.</p>
                <Link to="/forum">
                    <button> Explore</button>
                </Link>
            </div>
        </div>
            <div className="footerContainer" >
               <h2>Book a free meeting with a tutor today and find out how they can help you</h2>
            <div className="btn">

            <Link to="/signup">
                     Find a tutor
                </Link>
            </div>
            </div>
        </>
    );
}

export default ResforumComponent;
