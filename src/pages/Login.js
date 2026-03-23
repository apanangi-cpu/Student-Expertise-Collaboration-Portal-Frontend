import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

const navigate = useNavigate();

const [formData, setFormData] = useState({
email: "",
password: ""
});

// useEffect(() => {

// const token = localStorage.getItem("token");

// if (token) {
// navigate("/home");
// }
// }, [navigate]);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);

const handleChange = (e) => {

setFormData({
...formData,
[e.target.name]: e.target.value
});

};


const handleSubmit = async (e) => {

e.preventDefault();

try {

const response = await API.post("/auth/login", formData);

localStorage.setItem("token", response.data.token);

alert("Login successful!");

// navigate("/home");
navigate("/dashboard");

} catch (error) {

alert(error.response?.data?.message || "Login failed");

}

};


return (

<div className="login-container">

  <div className="login-inner">   {/* 🔥 NEW WRAPPER */}

    <h1 className="main-title">
      Student Expertise and Collaboration Portal
    </h1>

    <div className="login-box">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <br /><br />
      <div className="login-inner"></div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Login</button>

      </form>

      <br />

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

    </div>

  </div>

</div>

);

}

export default Login;