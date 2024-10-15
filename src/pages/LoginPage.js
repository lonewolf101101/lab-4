import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes for login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Submit handler for login
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Get user data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user exists and password matches
    const user = storedUsers.find(
      (user) => user.username === loginData.username && user.password === loginData.password
    );

    if (user) { 
      console.log('User logged in:', loginData);
      setError('');
      localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage for logged in status
      setSuccessMessage('Хэрэглэгч амжилттай нэмэгдлээ.'); // "User added successfully."
      setTimeout(() => {
        navigate('/main'); // Redirect to the main page after a short delay
      }, 2000); // Delay for user to see the success message  
    } else {
      setError('Нэвтрэх нэр эсвэл нууц үг буруу байна.'); // "Invalid username or password"
    }
  };


  // Submit handler for adding a new user
  const handleRegisterRedirect = (e) => {
      navigate('/add-user'); // Redirect to main page after registration
  };

  return (
    <div className="container">
        <div>
          <h1 className="form-title">Нэвтрэх</h1>
          {successMessage && <p className="success">{successMessage}</p>}
          <form onSubmit={handleLoginSubmit}>
            <input
              name="username"
              placeholder="Хэрэглэгчийн нэр"
              value={loginData.username}
              onChange={handleLoginChange}
              required
            />
            <input
              name="password"
              placeholder="Нууц үг"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button type="submit">Нэвтрэх</button>
          </form>
          <p>{error && <span className="error">{error}</span>}</p>
          <p>
            Шинэ хэрэглэгч үү? <span className="link" onClick={() => handleRegisterRedirect()}>Хэрэглэгч нэмэх</span>
          </p>
        </div>
    </div>
  );
}

export default LoginPage;
