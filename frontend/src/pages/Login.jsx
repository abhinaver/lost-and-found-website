import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    
    axios.post('http://localhost:8081/login', { email, password })
      .then(response => {
        console.log(response.data);
        if (response.data.message) {
          alert("Login Successful");
          localStorage.setItem("username", response.data.user.username);
          window.location.href = "/";
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        alert("Login Failed. Try Again.");
      });
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="register-link">
          New here? <a href="/Signup">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
