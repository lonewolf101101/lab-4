import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import MainPage from './pages/MainPage';
import AddLocation from './pages/AddLocation';
import DetailsPage from './pages/DetailsPage';
import LoginPage from './pages/LoginPage';
import AddUserPage from './pages/AddUserPage';
import Users from './pages/Users';

function App() {
  // Check if the user is logged in
  var user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Header /> {/* Header component with user info and logout */}
      <Routes>
        <Route path="/" element={<Users />} /> {/* Default route */}
        <Route path="/login" element={<LoginPage />} /> {/* Accessible when logged out */}
        <Route path="/add-user" element={<AddUserPage />} />
        {user ? (
          <>
            <Route path="/main" element={<MainPage />} />
            <Route path="/add-location" element={<AddLocation />} />
            <Route path="/details/:index" element={<DetailsPage />} />
          </>
        ) : (
          <>
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
