import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import Header from './components/Header';
import ResponseForm from './components/ResponseForm';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path = "/login" element = {<Login />} />
        <Route path = "/" element = {<Dashboard />} />
        <Route path = "/create" element = {<CreateForm />} />
        <Route path = "/edit/:id" element = {<EditForm/>} />
        <Route path = "/fillform/:id" element = {<ResponseForm />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
