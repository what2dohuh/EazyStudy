 import React from 'react';
 import FindtutorcardComponent from '../../components/findtutorcard.component'
 import '../../style/findatutor.d.css'
 import BannerfindtutorComponent from '../../components/bannerfindtutor.component'
 const FindatutorPage = () => {
    return (
        <div className='mainfindtutor'>
            <h2>Find tutor</h2>
            <div className="findtutorbox">
            <BannerfindtutorComponent/>
                
                <h2>Maths Tutor's</h2>

                <div className="showlisttutor">
                    <FindtutorcardComponent/>
                    <FindtutorcardComponent/>
                    <FindtutorcardComponent/>
                    <FindtutorcardComponent/>
                    <FindtutorcardComponent/>
                </div>
            </div>
        </div>
    );
 }
 
 export default FindatutorPage;
 