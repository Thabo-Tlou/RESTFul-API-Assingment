import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router

import Login from "./components/Login";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<p>Page not found</p>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
