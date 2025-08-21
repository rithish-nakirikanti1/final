import React, { useState, useEffect } from "react";
import "./App.css"; // import css

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const API_URL = "http://15.206.94.166:4000"; // EC2 backend

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/getUsers`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/addUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ name: "", email: "" });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1 className="title">📖 Guestbook App</h1>
      <form className="form" onSubmit={addUser}>
        <input
          type="text"
          placeholder="Enter name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">+ Add User</button>
      </form>

      <h2 className="subtitle">👥 User List</h2>
      <ul className="user-list">
        {users.map((u) => (
          <li key={u.id} className="user-card">
            <span className="user-name">{u.name}</span>
            <span className="user-email">{u.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
