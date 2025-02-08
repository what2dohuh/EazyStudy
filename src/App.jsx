
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
        <Route path="/student/message" element={<MessagestudentPage/>} />
        <Route path="/student/booking" element={<BookingstudentPage/>} />
        <Route path="/student/findatutor" element={<FindatutorPage/>} />
      </Routes>
      
    </Router>
    </UserContextProvider>
  )
}

export default App
