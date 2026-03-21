import React, { useState } from "react";
import API from "../services/api";

function Register() {

const [formData, setFormData] = useState({
fullName: "",
email: "",
password: "",
phone: "",
department: "",
year: "",
skills: "",
gender: "",
profilePhoto: null
});


const handleChange = (e) => {

if (e.target.name === "profilePhoto") {

setFormData({
...formData,
profilePhoto: e.target.files[0]
});

} else {

setFormData({
...formData,
[e.target.name]: e.target.value
});

}

};


const handleSubmit = async (e) => {

e.preventDefault();

const form = new FormData();

form.append("fullName", formData.fullName);
form.append("email", formData.email);
form.append("password", formData.password);
form.append("phone", formData.phone);
form.append("department", formData.department);
form.append("year", formData.year);
form.append("skills", formData.skills);
form.append("gender", formData.gender);
form.append("profilePhoto", formData.profilePhoto);

try {

const response = await API.post("/auth/register", form);

alert(response.data.message);

} catch (error) {

console.log("FULL ERROR:", error.response?.data);

alert(error.response?.data?.message || "Error registering");

}

};


return (

<div style={{ padding: "40px" }}>

<h2>Register</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
name="fullName"
placeholder="Full Name"
onChange={handleChange}
required
/>

<br /><br />

<input
type="email"
name="email"
placeholder="Email"
onChange={handleChange}
required
/>

<br /><br />

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
required
/>

<br /><br />

<input
type="text"
name="phone"
placeholder="Phone"
onChange={handleChange}
required
/>

<br /><br />

<input
type="text"
name="department"
placeholder="Department"
onChange={handleChange}
required
/>

<br /><br />

<input
type="text"
name="year"
placeholder="Year"
onChange={handleChange}
/>

<br /><br />

<input
type="text"
name="skills"
placeholder="Skills (React, Node, Python)"
onChange={handleChange}
/>

<br /><br />

<label>Gender:</label><br />

<select
name="gender"
onChange={handleChange}
required
>

<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>

</select>

<br /><br />

<label>Upload Profile Photo:</label><br />

<input
type="file"
name="profilePhoto"
accept="image/*"
onChange={handleChange}
required
/>

<br /><br />

<button type="submit">Register</button>

</form>

</div>

);

}

export default Register;