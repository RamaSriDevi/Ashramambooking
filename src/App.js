import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Register from "./components/register";
import UserList from "./components/userlist";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            📝 Register
          </NavLink>
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            📋 Users
          </NavLink>
        </nav>

        {/* Routing Section */}
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
