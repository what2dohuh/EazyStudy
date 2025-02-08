import React from 'react';
import '../../style/bookingstudent.d.css'
import BannerfindtutorComponent from '../../components/bannerfindtutor.component';
import BookingstudentComponent from '../../components/bookingstudent.component';

const BookingstudentPage = () => {
    return (
        <div className='bookingstudent'>
            <div className="bookingbox">
                <div className="bookingbox2">
                    <div className="bookingbannerbox">
                <h3>Your booking's</h3>
                    <BannerfindtutorComponent/>
                    <BookingstudentComponent/>
                    </div>
                  
                </div>
            </div>
        </div>
    );
}

export default BookingstudentPage;
