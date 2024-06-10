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

  fetch('https://liquid-lounge-acdcda81ea65.herokuapp.com/auth/login', {
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
          localStorage.setItem('username', data.user.username)
          navigate('/drink')
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
  <div class='login-page'>
  <div className='text-center'>
  <h1 className='text-3xl mt-4'>Login Page</h1>
  <form onSubmit={handleSubmit}>
    <label className='block mb-4 mt-6 font-bold' htmlFor="username">Username:</label>
    <input
      type="text"
      id="username"
      name="username"
      onChange={handleChange}
      value={formData.username}
      className='form-input mt-1 block w-full border rounded py-2 px-3'
    />

    <label className='block mb-4 mt-6 font-bold' htmlFor="password">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      onChange={handleChange}
      value={formData.password}
      className='form-input mt-1 block w-full border rounded py-2 px-3'
    />
    <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit" value="Login" />
    <div className='mt-4'>
    <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" href='/'>Home Page</a>
    </div>
  </form>
  </div>
  </div>
)

}

export default LoginPage