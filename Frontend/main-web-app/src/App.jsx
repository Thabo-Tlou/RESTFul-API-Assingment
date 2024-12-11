import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // React Router
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import About from "./pages/About";
import Contact from "./pages/Contact";


const App = () => {
  return (
    <Router>
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<p>Page not found</p>} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
