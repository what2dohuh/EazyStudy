import React, { useContext } from 'react';
import search from '../assets/search.gif';
import { UserContext } from '../contex/user.context';
import StudentmessageComponent from './studentmessage.component';

const BannerfindtutorComponent = () => {
    const {user}  = useContext(UserContext)

    return (
        <div className='bannermain'>
        <div className='bannerfindtutor'>
            <div className="bannertext">
                <img src={search}/>
               <p> Find tutor of your liking</p> 
            </div>
            <div className="subject">
                <label>Subject</label>
                <select>
                    <option value="">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Art">Art</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Literature">Literature</option>
                    <option value="Religion">Religion</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="level">
                <label>Level</label>
                <select>
                    <option value="">All Levels</option>
                    <option value="Primary">Primary</option>
                    <option value="Middle School">Middle School</option>
                    <option value="High School">High School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                </select>
            </div>
            <div className="findtutbtn">
            <label>.</label>

                <button>Find Tutor</button>
            </div>
        </div>


        </div>
    );
}

export default BannerfindtutorComponent;
