import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddLocation() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null); // State for image
  const navigate = useNavigate();

  // Get the logged-in user
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new place object
    const newPlace = {
      name,
      description,
      location,
      image: image ? URL.createObjectURL(image) : null, // Convert the image file to a URL
      user: user.username // Associate the location with the logged-in user
    };

    // Save to localStorage
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    storedPlaces.push(newPlace);
    localStorage.setItem('places', JSON.stringify(storedPlaces));

    // Navigate back to the main page associated with the user
    navigate(`/${user.username}`);
  };

  return (
    <div className="container">
      <h1 className="form-title">Газар нэмэх</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Газарын нэр"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Тайлбар"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Байршил"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])} // Get the selected file
          required
        />
        <button type="submit">Нэмэх</button> {/* "Add" button */}
      </form>
    </div>
  );
}

export default AddLocation;
