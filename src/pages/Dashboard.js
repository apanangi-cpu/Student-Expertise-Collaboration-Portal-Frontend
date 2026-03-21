// import React, { useEffect, useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
// const [user, setUser] = useState(null);
// const [showForm, setShowForm] = useState(false);

// const [projectData, setProjectData] = useState({
// title: "",
// description: "",
// technologies: "",
// githubLink: "",
// demoLink: "",
// isCurrent: false
// });

// const navigate = useNavigate();

// useEffect(() => {
// const fetchProfile = async () => {
// try {
// const res = await API.get("/users/me");
// setUser(res.data);
// } catch (error) {
// alert("Please login first");
// navigate("/login");
// }
// };

// fetchProfile();
// }, [navigate]);

// const handleProjectChange = (e) => {
// const { name, value, type, checked } = e.target;

// setProjectData({
// ...projectData,
// [name]: type === "checkbox" ? checked : value
// });
// };

// const handleAddProject = async (e) => {
// e.preventDefault();

// try {
// const res = await API.post("/users/add-project", {
// ...projectData,
// technologies: projectData.technologies
// .split(",")
// .map((tech) => tech.trim())
// });

// setUser({
// ...user,
// projects: res.data.projects
// });

// setProjectData({
// title: "",
// description: "",
// technologies: "",
// githubLink: "",
// demoLink: "",
// isCurrent: false
// });

// setShowForm(false);
// alert("Project added successfully");

// } catch (error) {
// alert("Error adding project");
// }
// };

// const handleDelete = async (id) => {
// try {

// const res = await API.delete(`/users/delete-project/${id}`);

// setUser({
// ...user,
// projects: res.data.projects
// });

// alert("Project deleted");

// } catch (error) {
// alert("Error deleting project");
// }
// };

// if (!user) return <h2>Loading...</h2>;

// const currentProjects = user.projects.filter((p) => p.isCurrent);
// const completedProjects = user.projects.filter((p) => !p.isCurrent);

// return (
// <div style={{ padding: "40px" }}>

// <h1 style={{ textAlign: "center" }}>Dashboard</h1>

// {/* Profile Section */}

// <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>

// <div style={{ flex: 1 }}>

// <h3>Profile Information</h3>

// <p><strong>Name:</strong> {user.fullName}</p>
// <p><strong>Email:</strong> {user.email}</p>
// <p><strong>Department:</strong> {user.department}</p>
// <p><strong>Year:</strong> {user.year}</p>
// <p><strong>Phone:</strong> {user.phone}</p>
// <p><strong>Gender:</strong> {user.gender}</p>
// <p><strong>Availability:</strong> {user.availability}</p>
// <p><strong>Currently Working On:</strong> {user.currentlyWorkingOn}</p>

// <h4>Skills:</h4>

// <ul>
// {user.skills.map((skill, index) => (
// <li key={index}>{skill}</li>
// ))}
// </ul>

// </div>

// <div style={{ marginRight: "80px" }}>

// {user.profilePhoto ? (

// <img
// src={`http://localhost:5000/uploads/${user.profilePhoto}`}
// alt="Profile"
// style={{
// width: "300px",
// height: "300px",
// objectFit: "cover",
// borderRadius: "15px",
// boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
// }}
// />

// ) : (

// <div
// style={{
// width: "300px",
// height: "300px",
// backgroundColor: "#ddd",
// display: "flex",
// alignItems: "center",
// justifyContent: "center",
// borderRadius: "15px"
// }}
// >
// No Image
// </div>

// )}

// </div>

// </div>

// <hr />

// {/* Projects Section */}

// <h2>Projects</h2>

// <button
// onClick={() => setShowForm(true)}
// style={{
// background: "#2563eb",
// color: "white",
// border: "none",
// padding: "10px 20px",
// borderRadius: "6px",
// cursor: "pointer",
// marginBottom: "20px"
// }}
// >
// Add New Project
// </button>

// {/* Popup Modal */}

// {showForm && (

// <div
// style={{
// position: "fixed",
// top: 0,
// left: 0,
// width: "100%",
// height: "100%",
// background: "rgba(0,0,0,0.5)",
// display: "flex",
// justifyContent: "center",
// alignItems: "center"
// }}
// >

// <div
// style={{
// background: "white",
// padding: "30px",
// borderRadius: "10px",
// width: "500px"
// }}
// >

// <h3>Add New Project</h3>

// <form onSubmit={handleAddProject}>

// <input
// type="text"
// name="title"
// placeholder="Project Title"
// value={projectData.title}
// onChange={handleProjectChange}
// required
// />

// <br /><br />

// <textarea
// rows="5"
// style={{ width: "100%" }}
// name="description"
// placeholder="Project Description"
// value={projectData.description}
// onChange={handleProjectChange}
// required
// />

// <br /><br />

// <input
// type="text"
// name="technologies"
// placeholder="Technologies (React, Node)"
// value={projectData.technologies}
// onChange={handleProjectChange}
// />

// <br /><br />

// <input
// type="text"
// name="githubLink"
// placeholder="GitHub Link"
// value={projectData.githubLink}
// onChange={handleProjectChange}
// />

// <br /><br />

// <input
// type="text"
// name="demoLink"
// placeholder="Demo Link"
// value={projectData.demoLink}
// onChange={handleProjectChange}
// />

// <br /><br />

// <label>
// <input
// type="checkbox"
// name="isCurrent"
// checked={projectData.isCurrent}
// onChange={handleProjectChange}
// />
// Mark as Current Project
// </label>

// <br /><br />

// <button type="submit">Add Project</button>

// <button
// type="button"
// onClick={() => setShowForm(false)}
// style={{ marginLeft: "10px" }}
// >
// Cancel
// </button>

// </form>

// </div>

// </div>

// )}

// <h3>Current Projects</h3>

// {currentProjects.map((project) => (

// <div
// key={project._id}
// style={{
// border: "1px solid gray",
// padding: "10px",
// marginBottom: "10px",
// borderRadius:"8px"
// }}
// >

// <h4>{project.title}</h4>

// <p>{project.description}</p>

// <p><strong>Tech:</strong> {project.technologies.join(", ")}</p>

// {project.githubLink && (
// <p>
// <strong>GitHub:</strong>{" "}
// <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
// View Code
// </a>
// </p>
// )}

// {project.demoLink && (
// <p>
// <strong>Demo:</strong>{" "}
// <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
// Live Demo
// </a>
// </p>
// )}

// <button onClick={() => handleDelete(project._id)}>
// Delete Project
// </button>

// </div>

// ))}

// <h3>Completed Projects</h3>

// {completedProjects.length === 0 && <p>No completed projects</p>}

// {completedProjects.map((project) => (

// <div
// key={project._id}
// style={{
// border: "1px solid gray",
// padding: "10px",
// marginBottom: "10px",
// borderRadius:"8px"
// }}
// >

// <h4>{project.title}</h4>

// <p>{project.description}</p>

// <p><strong>Tech:</strong> {project.technologies.join(", ")}</p>

// {project.githubLink && (
// <p>
// <strong>GitHub:</strong>{" "}
// <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
// View Code
// </a>
// </p>
// )}

// {project.demoLink && (
// <p>
// <strong>Demo:</strong>{" "}
// <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
// Live Demo
// </a>
// </p>
// )}

// <button onClick={() => handleDelete(project._id)}>
// Delete Project
// </button>

// </div>

// ))}

// </div>
// );
// }

// export default Dashboard;


import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    demoLink: "",
    isCurrent: false
  });

  const navigate = useNavigate();

  // 🔥 LOGOUT FUNCTION ADDED
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data);
      } catch (error) {
        alert("Please login first");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleProjectChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProjectData({
      ...projectData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/add-project", {
        ...projectData,
        technologies: projectData.technologies
          .split(",")
          .map((tech) => tech.trim())
      });

      setUser({
        ...user,
        projects: res.data.projects
      });

      setProjectData({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        demoLink: "",
        isCurrent: false
      });

      setShowForm(false);
      alert("Project added successfully");

    } catch (error) {
      alert("Error adding project");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/users/delete-project/${id}`);

      setUser({
        ...user,
        projects: res.data.projects
      });

      alert("Project deleted");

    } catch (error) {
      alert("Error deleting project");
    }
  };

  if (!user) return <h2>Loading...</h2>;

  const currentProjects = user.projects.filter((p) => p.isCurrent);
  const completedProjects = user.projects.filter((p) => !p.isCurrent);

  return (
    <div style={{ padding: "40px" }}>

      {/* 🔥 HEADER WITH LOGOUT */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard</h1>

        <button
          onClick={handleLogout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* Profile Section */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>

        <div style={{ flex: 1 }}>
          <h3>Profile Information</h3>

          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Year:</strong> {user.year}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Availability:</strong> {user.availability}</p>
          <p><strong>Currently Working On:</strong> {user.currentlyWorkingOn}</p>

          <h4>Skills:</h4>

          <ul>
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginRight: "80px" }}>
          {user.profilePhoto ? (
            <img
              src={`http://localhost:5000/uploads/${user.profilePhoto}`}
              alt="Profile"
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}
            />
          ) : (
            <div
              style={{
                width: "300px",
                height: "300px",
                backgroundColor: "#ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "15px"
              }}
            >
              No Image
            </div>
          )}
        </div>

      </div>

      <hr />

      {/* Projects */}
      <h2>Projects</h2>

      <button
        onClick={() => setShowForm(true)}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Add New Project
      </button>

      {/* Modal */}
      {showForm && (
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
            padding: "30px",
            borderRadius: "10px",
            width: "500px"
          }}>

            <h3>Add New Project</h3>

            <form onSubmit={handleAddProject}>
              <input type="text" name="title" placeholder="Project Title" value={projectData.title} onChange={handleProjectChange} required />
              <br /><br />

              <textarea rows="5" style={{ width: "100%" }} name="description" placeholder="Project Description" value={projectData.description} onChange={handleProjectChange} required />
              <br /><br />

              <input type="text" name="technologies" placeholder="Technologies (React, Node)" value={projectData.technologies} onChange={handleProjectChange} />
              <br /><br />

              <input type="text" name="githubLink" placeholder="GitHub Link" value={projectData.githubLink} onChange={handleProjectChange} />
              <br /><br />

              <input type="text" name="demoLink" placeholder="Demo Link" value={projectData.demoLink} onChange={handleProjectChange} />
              <br /><br />

              <label>
                <input type="checkbox" name="isCurrent" checked={projectData.isCurrent} onChange={handleProjectChange} />
                Mark as Current Project
              </label>

              <br /><br />

              <button type="submit">Add Project</button>
              <button type="button" onClick={() => setShowForm(false)} style={{ marginLeft: "10px" }}>
                Cancel
              </button>

            </form>

          </div>
        </div>
      )}

      {/* Current */}
      <h3>Current Projects</h3>

      {currentProjects.map((project) => (
        <div key={project._id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}>
          <h4>{project.title}</h4>
          <p>{project.description}</p>
          <p><strong>Tech:</strong> {project.technologies.join(", ")}</p>
          <button onClick={() => handleDelete(project._id)}>Delete</button>
        </div>
      ))}

      {/* Completed */}
      <h3>Completed Projects</h3>

      {completedProjects.map((project) => (
        <div key={project._id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}>
          <h4>{project.title}</h4>
          <p>{project.description}</p>
          <p><strong>Tech:</strong> {project.technologies.join(", ")}</p>
          <button onClick={() => handleDelete(project._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}

export default Dashboard;