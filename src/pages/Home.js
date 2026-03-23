// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// function Home() {

// const [users, setUsers] = useState([]);
// const [search, setSearch] = useState("");
// const [showMenu, setShowMenu] = useState(false);
// const [currentUser, setCurrentUser] = useState(null);

// const navigate = useNavigate();


// // Fetch all users
// const fetchUsers = async () => {
// try {
// const res = await API.get("/users/all");
// setUsers(res.data);
// } catch (error) {
// console.log("Error fetching users");
// }
// };


// // Fetch logged in user
// const fetchCurrentUser = async () => {
// try {
// const res = await API.get("/users/me");
// setCurrentUser(res.data);
// } catch (error) {
// console.log("Error fetching current user");
// }
// };


// // Initial load
// useEffect(() => {
// fetchUsers();
// fetchCurrentUser();
// }, []);


// // Auto refresh every 5 seconds
// useEffect(() => {
// const interval = setInterval(() => {
// fetchUsers();
// }, 5000);

// return () => clearInterval(interval);

// }, []);


// // Search handling
// const handleSearch = async (e) => {

// const value = e.target.value;

// setSearch(value);

// try {

// if (value.trim() === "") {
// fetchUsers();
// }
// else {

// const res = await API.get(`/users/search?q=${value}`);

// setUsers(res.data);

// }

// } catch (error) {
// console.log("Search error");
// }

// };


// const handleLogout = () => {
// localStorage.removeItem("token");
// navigate("/");
// };


// return (

// <div style={{ padding: "40px", position: "relative" }}>


// {/* PROFILE ICON TOP RIGHT */}

// <div style={{ position: "absolute", top: "20px", right: "40px" }}>

// <div
// onClick={() => setShowMenu(!showMenu)}
// style={{
// width: "45px",
// height: "45px",
// borderRadius: "50%",
// overflow: "hidden",
// cursor: "pointer",
// border: "2px solid #007bff"
// }}
// >

// {currentUser?.profilePhoto ? (

// <img
// src={`http://localhost:5000/uploads/${currentUser.profilePhoto}`}
// alt="Profile"
// style={{ width: "100%", height: "100%", objectFit: "cover" }}
// />

// ) : (

// <img
// src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
// alt="Default"
// style={{ width: "100%", height: "100%", objectFit: "cover" }}
// />

// )}

// </div>


// {showMenu && (

// <div
// style={{
// position: "absolute",
// right: "0",
// top: "55px",
// background: "white",
// border: "1px solid #ccc",
// borderRadius: "8px",
// width: "160px",
// boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
// }}
// >

// <div
// onClick={() => navigate("/dashboard")}
// style={{
// padding: "10px",
// cursor: "pointer",
// borderBottom: "1px solid #eee"
// }}
// >
// My Dashboard
// </div>

// <div
// onClick={handleLogout}
// style={{
// padding: "10px",
// cursor: "pointer",
// color: "red"
// }}
// >
// Logout
// </div>

// </div>

// )}

// </div>


// <h1 style={{ textAlign: "center" }}>
// Student Expertise Portal
// </h1>


// <input
// type="text"
// placeholder="Search by name, skill, technology..."
// value={search}
// onChange={handleSearch}
// style={{
// padding: "8px",
// width: "300px",
// borderRadius: "6px",
// border: "1px solid #ccc"
// }}
// />


// <div
// style={{
// display: "grid",
// gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
// gap: "20px",
// marginTop: "30px"
// }}
// >

// {users.length === 0 ? (

// <p>No users found</p>

// ) : (

// users.map((user) => (

// <div
// key={user._id}
// onClick={() => navigate(`/profile/${user._id}`)}
// style={{
// border: "1px solid #ddd",
// padding: "15px",
// cursor: "pointer",
// borderRadius: "10px",
// boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
// }}
// >

// {/* PHOTO + NAME */}

// <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>

// <img
// src={
// user.profilePhoto
// ? `http://localhost:5000/uploads/${user.profilePhoto}`
// : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
// }
// alt="profile"
// style={{
// width: "45px",
// height: "45px",
// borderRadius: "50%",
// objectFit: "cover",
// marginRight: "10px",
// border: "2px solid #007bff"
// }}
// />

// <h3 style={{ margin: 0 }}>{user.fullName}</h3>

// </div>


// <p><strong>Department:</strong> {user.department}</p>
// <p><strong>Year:</strong> {user.year}</p>
// <p><strong>Availability:</strong> {user.availability}</p>


// <p><strong>Top Skills:</strong></p>

// <ul>
// {user.skills?.slice(0, 3).map((skill, index) => (
// <li key={index}>{skill}</li>
// ))}
// </ul>


// {user.currentlyWorkingOn && (
// <p>
// <strong>Working On:</strong> {user.currentlyWorkingOn}
// </p>
// )}

// </div>

// ))

// )}

// </div>

// </div>

// );

// }

// export default Home;







// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// function Home() {

// const [users, setUsers] = useState([]);
// const [search, setSearch] = useState("");
// const [showMenu, setShowMenu] = useState(false);
// const [currentUser, setCurrentUser] = useState(null);

// const navigate = useNavigate();


// // Fetch all users
// const fetchUsers = async () => {
//   try {
//     const res = await API.get("/users/all");
//     setUsers(res.data);
//   } catch (error) {
//     console.log("Error fetching users");
//   }
// };


// // Fetch logged in user (if token exists)
// const fetchCurrentUser = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return; // 🔥 IMPORTANT (no error if not logged in)

//     const res = await API.get("/users/me");
//     setCurrentUser(res.data);
//   } catch (error) {
//     console.log("Not logged in");
//   }
// };


// // Initial load
// useEffect(() => {
//   fetchUsers();
//   fetchCurrentUser();
// }, []);


// // Auto refresh users
// useEffect(() => {
//   const interval = setInterval(() => {
//     fetchUsers();
//   }, 5000);

//   return () => clearInterval(interval);
// }, []);


// // Search
// const handleSearch = async (e) => {
//   const value = e.target.value;
//   setSearch(value);

//   try {
//     if (value.trim() === "") {
//       fetchUsers();
//     } else {
//       const res = await API.get(`/users/search?q=${value}`);
//       setUsers(res.data);
//     }
//   } catch (error) {
//     console.log("Search error");
//   }
// };


// const handleLogout = () => {
//   localStorage.removeItem("token");
//   setCurrentUser(null);
//   navigate("/");
// };


// return (

// <div style={{ padding: "40px", position: "relative" }}>


// {/* 🔥 TOP RIGHT SECTION (LOGIN / PROFILE) */}

// <div style={{ position: "absolute", top: "20px", right: "40px" }}>

// {currentUser ? (

//   <>
//     {/* Profile Icon */}
//     <div
//       onClick={() => setShowMenu(!showMenu)}
//       style={{
//         width: "45px",
//         height: "45px",
//         borderRadius: "50%",
//         overflow: "hidden",
//         cursor: "pointer",
//         border: "2px solid #007bff"
//       }}
//     >
//       <img
//         src={
//           currentUser.profilePhoto
//             ? `http://localhost:5000/uploads/${currentUser.profilePhoto}`
//             : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//         }
//         alt="Profile"
//         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//       />
//     </div>

//     {/* Dropdown */}
//     {showMenu && (
//       <div
//         style={{
//           position: "absolute",
//           right: "0",
//           top: "55px",
//           background: "white",
//           border: "1px solid #ccc",
//           borderRadius: "8px",
//           width: "160px",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
//         }}
//       >
//         <div
//           onClick={() => navigate("/dashboard")}
//           style={{
//             padding: "10px",
//             cursor: "pointer",
//             borderBottom: "1px solid #eee"
//           }}
//         >
//           My Dashboard
//         </div>

//         <div
//           onClick={handleLogout}
//           style={{
//             padding: "10px",
//             cursor: "pointer",
//             color: "red"
//           }}
//         >
//           Logout
//         </div>
//       </div>
//     )}

//   </>

// ) : (

//   /* 🔥 LOGIN BUTTON */
//   <button onClick={() => navigate("/login")}>
//     Login
//   </button>

// )}

// </div>


// {/* 🔥 TITLE */}
// <h1 style={{ textAlign: "center" }}>
//   Student Expertise Portal
// </h1>


// {/* 🔥 MDC DESCRIPTION */}
// <p style={{
//   textAlign: "center",
//   maxWidth: "700px",
//   margin: "10px auto",
//   color: "#555"
// }}>
//   MDC (Microsoft Developer Club) at GITAM Visakhapatnam is a student-driven
//   community focused on innovation, collaboration, and technical growth.
//   This platform helps students showcase their skills, projects, and connect
//   with other developers.
// </p>


// {/* SEARCH */}
// <input
//   type="text"
//   placeholder="Search by name, skill, technology..."
//   value={search}
//   onChange={handleSearch}
//   style={{
//     padding: "8px",
//     width: "300px",
//     borderRadius: "6px",
//     border: "1px solid #ccc"
//   }}
// />


// {/* USER GRID */}
// <div
//   style={{
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//     gap: "20px",
//     marginTop: "30px"
//   }}
// >

// {users.length === 0 ? (

//   <p>No users found</p>

// ) : (

//   users.map((user) => (

//     <div
//       key={user._id}
//       onClick={() => navigate(`/profile/${user._id}`)}
//       style={{
//         border: "1px solid #ddd",
//         padding: "15px",
//         cursor: "pointer",
//         borderRadius: "10px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
//       }}
//     >

//       {/* PHOTO + NAME */}
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>

//         <img
//           src={
//             user.profilePhoto
//               ? `http://localhost:5000/uploads/${user.profilePhoto}`
//               : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//           }
//           alt="profile"
//           style={{
//             width: "45px",
//             height: "45px",
//             borderRadius: "50%",
//             objectFit: "cover",
//             marginRight: "10px",
//             border: "2px solid #007bff"
//           }}
//         />

//         <h3 style={{ margin: 0 }}>{user.fullName}</h3>

//       </div>

//       <p><strong>Department:</strong> {user.department}</p>
//       <p><strong>Year:</strong> {user.year}</p>
//       <p><strong>Availability:</strong> {user.availability}</p>

//       <p><strong>Top Skills:</strong></p>

//       <ul>
//         {user.skills?.slice(0, 3).map((skill, index) => (
//           <li key={index}>{skill}</li>
//         ))}
//       </ul>

//       {user.currentlyWorkingOn && (
//         <p>
//           <strong>Working On:</strong> {user.currentlyWorkingOn}
//         </p>
//       )}

//     </div>

//   ))

// )}

// </div>

// </div>

// );

// }

// export default Home;




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// function Home() {

// const [users, setUsers] = useState([]);
// const [search, setSearch] = useState("");
// const [currentUser, setCurrentUser] = useState(null);

// const navigate = useNavigate();


// // Fetch users
// const fetchUsers = async () => {
//   try {
//     const res = await API.get("/users/all");
//     setUsers(res.data);
//   } catch (error) {
//     console.log("Error fetching users");
//   }
// };


// // Fetch logged user
// const fetchCurrentUser = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const res = await API.get("/users/me");
//     setCurrentUser(res.data);
//   } catch (error) {
//     console.log("Not logged in");
//   }
// };


// // Initial load
// useEffect(() => {
//   fetchUsers();
//   fetchCurrentUser();
// }, []);


// // Auto refresh
// useEffect(() => {
//   const interval = setInterval(fetchUsers, 5000);
//   return () => clearInterval(interval);
// }, []);


// // Search
// const handleSearch = async (e) => {
//   const value = e.target.value;
//   setSearch(value);

//   try {
//     if (value.trim() === "") {
//       fetchUsers();
//     } else {
//       const res = await API.get(`/users/search?q=${value}`);
//       setUsers(res.data);
//     }
//   } catch (error) {
//     console.log("Search error");
//   }
// };


// return (

// <div style={{ padding: "20px" }}>

// {/* 🔥 NAVBAR */}
// <div style={{
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   padding: "15px 30px",
//   background: "white",
//   borderRadius: "12px",
//   boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//   marginBottom: "30px"
// }}>

//   {/* LEFT LOGO */}
//   <h2 style={{
//     color: "#2563eb",
//     fontWeight: "700",
//     fontSize: "22px"
//   }}>
//     MDC
//   </h2>

//   {/* 🔥 CENTER TITLE (PREMIUM STYLE) */}
//   <h1 style={{
//     fontWeight: "800",
//     fontSize: "26px",
//     letterSpacing: "0.5px",
//     fontFamily: "Segoe UI, sans-serif",
//     margin: 0
//   }}>
//     Student Expertise Collaboration Portal
//   </h1>

//   {/* RIGHT BUTTON */}
//   <div>
//     {currentUser ? (
//       <button onClick={() => navigate("/dashboard")}>
//         Dashboard
//       </button>
//     ) : (
//       <button onClick={() => navigate("/login")}>
//         Login
//       </button>
//     )}
//   </div>

// </div>


// {/* 🔥 DESCRIPTION */}
// {/* 🔥 ABOUT MDC CARD */}

// <div style={{
//   maxWidth: "900px",
//   margin: "40px auto",
//   padding: "30px",
//   background: "white",
//   borderRadius: "16px",
//   boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
//   textAlign: "center"
// }}>


//   {/* Big Title */}
//   <h1 style={{
//     fontSize: "38px",
//     fontWeight: "800",
//     lineHeight: "1.3",
//     marginBottom: "15px"
//   }}>
//    {" "}
//     <span style={{
//       background: "linear-gradient(90deg,#2563eb,#7c3aed)",
//       WebkitBackgroundClip: "text",
//       color: "transparent"
//     }}>
//       Meta Developer Communities
//     </span>
//   </h1>

//   {/* Description */}
//   <p style={{
//     color: "#555",
//     fontSize: "17px",
//     lineHeight: "1.8"
//   }}>
//     Meta Developer Communities (MDC) is more than just a club. We are a dynamic
//     collective of tech enthusiasts, designers, and problem solvers at Gitam.
//     Our mission is to bridge the gap between theoretical knowledge and
//     practical, industry-standard development.
//   </p>

// </div>


// {/* 🔥 SEARCH (LEFT ALIGNED) */}
// <div style={{ marginBottom: "20px" }}>
//   <input
//     type="text"
//     placeholder="Search by name, skill, technology..."
//     value={search}
//     onChange={handleSearch}
//     style={{
//       width: "300px",
//       padding: "10px",
//       borderRadius: "8px",
//       border: "1px solid #ccc"
//     }}
//   />
// </div>


// {/* USER GRID */}
// <div
//   style={{
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//     gap: "20px",
//     marginTop: "10px"
//   }}
// >

// {users.length === 0 ? (

//   <p>No users found</p>

// ) : (

//   users.map((user) => (

//     <div
//       key={user._id}
//       onClick={() => navigate(`/profile/${user._id}`)}
//       style={{
//         border: "1px solid #ddd",
//         padding: "15px",
//         cursor: "pointer",
//         borderRadius: "10px",
//         boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
//       }}
//     >

//       <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>

//         <img
//           src={
//             user.profilePhoto
//               ? `http://localhost:5000/uploads/${user.profilePhoto}`
//               : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//           }
//           alt="profile"
//           style={{
//             width: "45px",
//             height: "45px",
//             borderRadius: "50%",
//             marginRight: "10px"
//           }}
//         />

//         <h3 style={{ margin: 0 }}>{user.fullName}</h3>

//       </div>

//       <p><strong>Department:</strong> {user.department}</p>
//       <p><strong>Year:</strong> {user.year}</p>
//       <p><strong>Availability:</strong> {user.availability}</p>

//       <ul>
//         {user.skills?.slice(0, 3).map((skill, index) => (
//           <li key={index}>{skill}</li>
//         ))}
//       </ul>

//     </div>

//   ))

// )}

// </div>

// </div>

// );

// }

// export default Home;



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
          Meta Developer Communities (MDC) is more than just a club. We are a
          dynamic collective of tech enthusiasts.
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