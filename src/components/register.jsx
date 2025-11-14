import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    location: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const backendURL = "http://localhost:3000/records";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Prevent leading spaces while typing
    setFormData({ ...formData, [name]: value.replace(/^\s+/, "") });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim all spaces before submitting
    const cleanedData = {
      firstName: formData.firstName.trim(),
      middleName: formData.middleName.trim(),
      lastName: formData.lastName.trim(),
      location: formData.location.trim(),
      phone: formData.phone.trim(),
    };

    // Validation
    if (!cleanedData.firstName || !cleanedData.lastName || !cleanedData.location || !cleanedData.phone) {
      setMessage("⚠️ FIRST NAME, LAST NAME, LOCATION, AND PHONE ARE REQUIRED!");
      return;
    }

    if (!/^\d{10}$/.test(cleanedData.phone)) {
      setMessage("⚠️ PHONE NUMBER MUST BE 10 DIGITS!");
      return;
    }

    try {
      await axios.post(backendURL, cleanedData);
      setMessage("✅ RECORD ADDED SUCCESSFULLY!");
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        location: "",
        phone: "",
      });
      setTimeout(() => navigate("/users"), 1500);
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ FAILED TO SAVE RECORD!");
    }
  };

  return (
    <div className="register-form">
      <h2>REGISTRATION FORM</h2>
      {message && <p className="success">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>FIRST NAME:</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
            required
          />
        </div>

        <div>
          <label>MIDDLE NAME (OPTIONAL):</label>
          <input
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Enter Middle Name"
          />
        </div>

        <div>
          <label>LAST NAME:</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
            required
          />
        </div>

        <div>
          <label>LOCATION:</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter Location"
            required
          />
        </div>

        <div>
          <label>PHONE:</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit Phone Number"
            required
          />
        </div>

        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default Register;
