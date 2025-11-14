import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");
  const backendURL = "http://localhost:3000/records";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(backendURL);
      // Trim all string fields safely before setting
      const cleanedData = res.data.map((rec) => ({
        ...rec,
        firstName: rec.firstName ? rec.firstName.trim() : "",
        middleName: rec.middleName ? rec.middleName.trim() : "",
        lastName: rec.lastName ? rec.lastName.trim() : "",
        location: rec.location ? rec.location.trim() : "",
        phone: rec.phone ? rec.phone.trim() : "",
      }));
      setRecords(cleanedData);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendURL}/${id}`);
      setRecords(records.filter((r) => r.id !== id));
      setMessage("🗑️ RECORD DELETED!");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error(err);
      setMessage("❌ FAILED TO DELETE RECORD!");
    }
  };

  return (
    <div className="user-list">
      <h2>USER LIST</h2>
      {message && <p className="success">{message}</p>}

      <Link to="/register" className="add-new">➕ ADD NEW</Link>

      <table>
        <thead>
          <tr>
            <th>S.NO</th>
            <th>FIRST NAME</th>
            <th>MIDDLE NAME</th>
            <th>LAST NAME</th>
            <th>LOCATION</th>
            <th>PHONE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="7">NO USERS FOUND</td>
            </tr>
          ) : (
            records.map((rec, index) => (
              <tr key={rec.id}>
                <td>{index + 1}</td>
                <td>{rec.firstName || "-"}</td>
                <td>{rec.middleName || "-"}</td>
                <td>{rec.lastName || "-"}</td>
                <td>{rec.location || "-"}</td>
                <td>{rec.phone || "-"}</td>
                <td>
                  <button onClick={() => handleDelete(rec.id)}>DELETE</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
