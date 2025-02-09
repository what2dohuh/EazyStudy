import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/home.d.css';
import myGif from '../assets/homesvg.gif'
import Banner from '../components/banner.component.jsx';
import ResforumComponent from '../components/resforum.component.jsx';
import Footer from '../components/footer.component.jsx';
import { UserContext } from '../contex/user.context.jsx';
const HomePage = () => {
    const {user} = useContext(UserContext)
    const nav = useNavigate()
    useEffect(() => {
        if(user && user.type) {
            console.log(user)
          nav(`${user.type}/home`)
    }
    }, [user]);
    return (
        <>
        <div className="home">
            <div className="headerContainer">
                <h1>Unlock Potential with Peer-to-Peer Learning</h1>
                <p>We understand that supporting your peers' education can be incredibly rewarding. As a tutor on EduConnect, you'll have the opportunity to help fellow students boost their grades and confidence while enhancing your own understanding and skills. Join us and become a part of a vibrant community where your knowledge can make a difference, and together, we can achieve academic success. Experience the joy of teaching, sharing, and growing with EduConnect.</p>
                <Link to="/signup">
                    <button> Sign up</button>
                </Link>
              
            </div>
            <div className="headerContainer">
       <img src={myGif}/>
            </div>
        </div>
            <Banner/>
            <ResforumComponent/>
            <Footer/>
        </>
    );
}

export default HomePage;
