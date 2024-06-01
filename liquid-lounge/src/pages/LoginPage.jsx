import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
const navigate = useNavigate()

const handleSubmit = (e) => {
  e.preventDefault();

  fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      if(data.token){
          console.debug(data)
          localStorage.setItem('userToken', data.token)
          navigate('/')
      }
      console.log(data)
  })
  .catch(error => {
    console.error('Login failed:', error.message);
 })
}

const handleChange = (e) =>
setFormData({
  ...formData,
  [e.target.name]: e.target.value
})

return (
  <form onSubmit={handleSubmit}>
    <h1>Login Here</h1>
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
      type="text"
      id="password"
      name="password"
      onChange={handleChange}
      value={formData.password}
    />
    <input type="submit" value="Login" />
  </form>
)

}

export default LoginPage