import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mail: '',
    location: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        navigate('/login');
      })
      .catch(error => {
        console.error('Error:', error)
      });
  };

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup Here</h1>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        onChange={handleChange}
        value={formData.username}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
      />

      <label htmlFor="mail">Mail</label>
      <input
        type="text"
        id="mail"
        name="mail"
        onChange={handleChange}
        value={formData.mail}
      />

      <label htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        name="location"
        onChange={handleChange}
        value={formData.location}
      />
      <input type="submit" value="Signup" /> 
    </form>
  );
};

export default SignupPage;
