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

    fetch('https://liquid-lounge-acdcda81ea65.herokuapp.com/auth/signup', {
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
    <div class="login-page">
    <div className='text-center'>
    <form onSubmit={handleSubmit}>
      <h1 className='text-3xl mt-4'>Signup Here</h1>
      <label className='block mb-4 mt-6 font-bold' htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        onChange={handleChange}
        value={formData.username}
        className='form-input mt-1 block w-full border rounded py-2 px-3'
      />

      <label className='block mb-4 mt-6 font-bold' htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        className='form-input mt-1 block w-full border rounded py-2 px-3'
      />

      <label className='block mb-4 mt-6 font-bold' htmlFor="mail">Mail</label>
      <input
        type="text"
        id="mail"
        name="mail"
        onChange={handleChange}
        value={formData.mail}
        className='form-input mt-1 block w-full border rounded py-2 px-3'
      />

      <label className='block mb-4 mt-6 font-bold' htmlFor="location">Location</label>
      <input
        type="text"
        id="location"
        name="location"
        onChange={handleChange}
        value={formData.location}
        className='form-input mt-1 block w-full border rounded py-2 px-3'
      />
      <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit" value="Signup" /> 
    </form>
    </div>
    </div>
  );
};

export default SignupPage;
