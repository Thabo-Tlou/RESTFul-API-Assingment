import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setError(""); 
    setSuccessMessage("");

    try {
      const response = await fetch("https://server-2-43kp.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        setSuccessMessage("Login successful! Redirecting to home...");

      
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        setError(data.message || "Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
      console.error("Login request failed:", err);
    }
  };

  return (
    <div className="page-with-background">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <button type="submit" className="submit-button">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
