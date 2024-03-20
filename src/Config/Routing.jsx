import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TotallTeacher from '../Components/TotallTeacher/TotallTeacher'
import Home from '../Components/Home/Home'
import Navbar from '../Components/Navbar/Navbar'
import AllStudents from '../Components/AllStudent/AllStudents'

function Routing() {
  return (
    <>
    <BrowserRouter>
    <div className="">
        <Navbar />
    </div>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/total teacher' element={<TotallTeacher/>}/>
        <Route path='/total students' element={<AllStudents/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Routing