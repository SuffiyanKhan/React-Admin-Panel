import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TotallTeacher from '../Components/TotallTeacher/TotallTeacher'
import Home from '../Components/Home/Home'
import Navbar from '../Components/Navbar/Navbar'

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
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Routing