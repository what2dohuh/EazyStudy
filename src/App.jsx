import NavbarComponent from './components/navbar.component'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import HomePage from './page/home.page'
import SelectLoginPage from './page/loginpages/Selectlogin.page'
import LoginPage from './page/loginpages/login.page'
import SelectsignupPage from './page/signuppages/selectsignup.page'
import SignupStudentPage from './page/signuppages/signupStudent.page'
import SignupTutorPage from './page/signuppages/signupTutor.page'
import { UserContextProvider } from './contex/user.context'
import MaintutorPage from './page/tutor/maintutor.page'
import MainstudentPage from './page/student/mainstudent.page'
import MessagestudentPage from './page/student/messagestudent.page'
import BookingstudentPage from './page/student/bookingstudent.page'
import FindatutorPage from './page/student/findatutor.page'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PersonalizedFeedPage from './page/personalized.page'
import SelectedFeedsPage from './page/selectedfeeds.page'
import AboutPage from './page/about.page'
import TeachPage from './page/teach.page'
import ConnectWithTutor from './page/connectwithtutuor';
import Chatbot from './chatbox'
import VideoCall from './components/VideoCall/VideoCall';

function App() {

  return (
    <UserContextProvider>
    <Router>
     <NavbarComponent/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupStudentPage/>} />
        <Route path="/select" element={<SelectLoginPage/>} />
        <Route path="/home" element={<MainstudentPage/>} />
        <Route path="/message" element={<MessagestudentPage/>} />
        <Route path="/student/booking" element={<BookingstudentPage/>} />
        <Route path="/find" element={<FindatutorPage/>} />
        <Route path="/personalized-feed" element={<PersonalizedFeedPage />} />
        <Route path="/selected-feeds" element={<SelectedFeedsPage />} />
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/teach" element={<TeachPage/>} />
        <Route path="/connect-tutor/:tutorId" element={<ConnectWithTutor />} />
        <Route path="/video-call/:tutorId" element={<VideoCall />} />
      </Routes>
      <ToastContainer />
      <Chatbot/>
    </Router>
    </UserContextProvider>
  )
}

export default App
