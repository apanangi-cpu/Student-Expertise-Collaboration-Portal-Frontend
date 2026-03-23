import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/all");
      setUsers(res.data);
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  // Fetch logged user
  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await API.get("/users/me");
      setCurrentUser(res.data);
    } catch (error) {
      console.log("Not logged in");
    }
  };

  // Initial load
  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  // Auto refresh
  useEffect(() => {
    const interval = setInterval(() => {
      fetchUsers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Search
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    try {
      if (value.trim() === "") {
        fetchUsers();
      } else {
        const res = await API.get(`/users/search?q=${value}`);
        setUsers(res.data);
      }
    } catch (error) {
      console.log("Search error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ color: "#2563eb", fontWeight: "700" }}>MDC</h2>

        <h1 style={{ fontWeight: "800", margin: 0 }}>
          Student Expertise Collaboration Portal
        </h1>

        <div>
          {currentUser ? (
            <button onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      </div>

      {/* ABOUT */}
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
          padding: "30px",
          background: "white",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontWeight: "800" }}>
          <span
            style={{
              background: "linear-gradient(90deg,#2563eb,#7c3aed)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Meta Developer Communities
          </span>
        </h1>

        <p>
          <center>Meta Developer Communities (MDC) is more than just a club. We are a dynamic collective of tech enthusiasts, designers and problem solvers at Gitam. Our mission is to bridge the gap between theoretical knowledge and practical, industry-standard development.</center>
        </p>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
        }}
      />

      {/* USERS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              onClick={() => navigate(`/profile/${user._id}`)}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              {/* ✅ PROFILE IMAGE FIXED */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={
                    user.profilePhoto
                      ? `https://student-expertise-collaboration-portal.onrender.com/uploads/${user.profilePhoto}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="profile"
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />

                <h3>{user.fullName}</h3>
              </div>

              <p><strong>Department:</strong> {user.department}</p>
              <p><strong>Year:</strong> {user.year}</p>
              <p><strong>Availability:</strong> {user.availability}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;