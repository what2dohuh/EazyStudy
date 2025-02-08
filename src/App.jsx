<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
=======

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
        <Route path="/signup" element={<SelectsignupPage/>} />
        <Route path="/login" element={<SelectLoginPage/>} />
        <Route path="/login/tutor" element={<LoginPage k='tutor'/>} />
        <Route path="/login/student" element={<LoginPage k='student'/>} />
        <Route path="/signup/student" element={<SignupStudentPage/>} />
        <Route path="/signup/tutor" element={<SignupTutorPage/>} />
        <Route path="/tutor/home" element={<MaintutorPage/>} />
        <Route path="/student/home" element={<MainstudentPage/>} />
        <Route path="/student/message" element={<MessagestudentPage/>} />
        <Route path="/student/booking" element={<BookingstudentPage/>} />
        <Route path="/student/findatutor" element={<FindatutorPage/>} />
      </Routes>
      
    </Router>
    </UserContextProvider>
>>>>>>> 489a09c (initial commit)
  )
}

export default App
