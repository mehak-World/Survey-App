import React from 'react'
import Home from './components/Home'
import Header from "./components/Header"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import SurveyBuilder from './components/SurveyBuilder'

const App = () => {
  return (
    <>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/surveys" element = {<Dashboard />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/create" element = {<SurveyBuilder />} />
      </Routes>
    </BrowserRouter>
    </>
    
  
  )
}

export default App
