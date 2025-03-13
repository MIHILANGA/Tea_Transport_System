import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');

  const addUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/users', {
        name,
        email,
        age,
        password,
      });
      alert('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <div>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={addUser}>Add User</button>
      </div>
    </div>
  );
};

export default AdminPanel;