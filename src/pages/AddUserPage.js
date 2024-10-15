import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddUserPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error message on input change
    setSuccessMessage(''); // Clear success message on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Basic validation
    if (!username || !email || !password) {
      setError('Бүх талбаруудыг бөглөх шаардлагатай.'); // "All fields are required."
      return;
    }

    // Logic to save the new user
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if the user already exists
    const userExists = existingUsers.some(user => user.username === username || user.email === email);
    if (userExists) {
      setError('Энэ нэр эсвэл и-мэйл аль хэдийн байна.'); // "This username or email already exists."
      return;
    }

    const newUser = { username, email, password};
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers)); // Store users in localStorage

    setSuccessMessage('Хэрэглэгч амжилттай нэмэгдлээ.'); // "User added successfully."
    setFormData({ username: '', email: '', password: '' }); // Reset form

    setTimeout(() => {
      navigate('/'); // Redirect to the main page after a short delay
    }, 2000); // Delay for user to see the success message
  };

  return (
    <div className="container">
      <h1 className="form-title">Хэрэглэгч нэмэх</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Хэрэглэгчийн нэр"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="И-мэйл"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Нууц үг"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Хадгалах</button>
      </form>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
}

export default AddUserPage;
