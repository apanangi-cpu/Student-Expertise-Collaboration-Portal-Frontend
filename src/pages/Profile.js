import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Profile() {

const { id } = useParams();
const [user, setUser] = useState(null);

// 🔥 NEW STATE FOR POPUP
const [showContact, setShowContact] = useState(false);

useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  try {
    const res = await API.get(`/users/profile/${id}`);
    setUser(res.data);
  } catch (error) {
    console.log("Error fetching profile");
  }
};

if (!user) return <h2>Loading...</h2>;

const currentProjects = user.projects.filter(p => p.isCurrent);
const completedProjects = user.projects.filter(p => !p.isCurrent);

return (

<div style={{ padding: "40px" }}>

<div style={{ display: "flex", alignItems: "center", gap: "30px" }}>

{user.profilePhoto ? (

<img
src={`http://localhost:5000/uploads/${user.profilePhoto}`}
alt="Profile"
style={{
width: "220px",
height: "220px",
objectFit: "cover",
borderRadius: "12px",
boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
position: "absolute",
right: "50px",
top:"70px"
}}
/>

) : (

<div
style={{
width: "180px",
height: "180px",
backgroundColor: "#ddd",
alignItems: "center",
justifyContent: "center",
borderRadius: "12px"
}}
>
No Image
</div>

)}

<h2>{user.fullName}</h2>

</div>

<p><strong>Department:</strong> {user.department}</p>
<p><strong>Year:</strong> {user.year}</p>
<p><strong>Availability:</strong> {user.availability}</p>

{user.currentlyWorkingOn && (
<p><strong>Currently Working On:</strong> {user.currentlyWorkingOn}</p>
)}

<h3>Skills</h3>

<ul>
{user.skills && user.skills.map((skill, index) => (
<li key={index}>{skill}</li>
))}
</ul>

{/* 🔥 UPDATED BUTTON */}
<button
onClick={() => setShowContact(true)}
style={{
marginTop: "10px",
padding: "8px 15px",
borderRadius: "5px",
cursor: "pointer"
}}
>
Contact
</button>

<hr />

<h3>Current Projects</h3>

{currentProjects.map(project => (

<div
key={project._id}
style={{
border: "1px solid gray",
padding: "10px",
marginBottom: "10px",
borderRadius: "6px"
}}
>

<h4>{project.title}</h4>
<p>{project.description}</p>
<p><strong>Tech:</strong> {project.technologies.join(", ")}</p>

{project.githubLink && (
<p>
<strong>GitHub:</strong>{" "}
<a href={project.githubLink} target="_blank" rel="noopener noreferrer">
View Code
</a>
</p>
)}

{project.demoLink && (
<p>
<strong>Demo:</strong>{" "}
<a href={project.demoLink} target="_blank" rel="noopener noreferrer">
Live Demo
</a>
</p>
)}

</div>

))}

<h3>Completed Projects</h3>

{completedProjects.map(project => (

<div
key={project._id}
style={{
border: "1px solid gray",
padding: "10px",
marginBottom: "10px",
borderRadius: "6px"
}}
>

<h4>{project.title}</h4>
<p>{project.description}</p>
<p><strong>Tech:</strong> {project.technologies.join(", ")}</p>

{project.githubLink && (
<p>
<strong>GitHub:</strong>{" "}
<a href={project.githubLink} target="_blank" rel="noopener noreferrer">
View Code
</a>
</p>
)}

{project.demoLink && (
<p>
<strong>Demo:</strong>{" "}
<a href={project.demoLink} target="_blank" rel="noopener noreferrer">
Live Demo
</a>
</p>
)}

</div>

))}

{/* 🔥 BEAUTIFUL POPUP MODAL */}
{showContact && (
<div style={{
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}}>

  <div style={{
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  }}>

    <h3>Contact Details</h3>

    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Phone:</strong> {user.phone}</p>

    <button
      onClick={() => setShowContact(false)}
      style={{
        marginTop: "15px",
        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      Close
    </button>

  </div>

</div>
)}

</div>

);
}

export default Profile;