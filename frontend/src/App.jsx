import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Use HashRouter instead
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import Header from './components/Header';
import ResponseForm from './components/ResponseForm';
import { UserProvider } from './utils/UserContext';

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateForm />} />
            <Route path="/edit/:id" element={<EditForm />} />
            <Route path="/fillform/:id" element={<ResponseForm />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
