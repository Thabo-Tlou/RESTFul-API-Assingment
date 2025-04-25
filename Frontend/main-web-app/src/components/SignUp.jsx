import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa"; // Import icons
import "../styles/SignUp.css";
import robotImage from "/images/ROBOT.png"; // Make sure the image path is correct

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://server-2-43kp.onrender.com/api/signup",
        formData
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="signup-ui-container">
      <div className="left-panel">
        <div className="robot-wrapper">
          <img
            src={robotImage}
            alt="Robot with Accessories"
            className="robot-img"
          />
          <div className="knee-caption">
            Capturing Innovation, <br />
            Empowering Intelligence
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="signup-form-box">
          <h2>Create an account</h2>
          <p className="login-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="terms">
              <input type="checkbox" required />
              <label>I agree to the Terms & Conditions</label>
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="signup-btn">
              Create account
            </button>
          </form>

          <div className="or-divider">OR</div>
          <div className="social-login">
            <button className="google-login">
              <FaGoogle className="google-icon" /> Google
            </button>
            <button className="apple-login">Apple</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
