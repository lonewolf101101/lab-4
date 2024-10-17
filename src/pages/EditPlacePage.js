import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPlacePage() {
  const { index } = useParams(); // Get the index of the place to be edited
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    image: null
  });

  useEffect(() => {
    // Fetch the place to be edited from localStorage
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    const place = storedPlaces[index];
    if (place) {
      setFormData({
        name: place.name,
        description: place.description,
        location: place.location,
        image: place.image
      });
    } else {
      navigate('/main'); // Redirect if place not found
    }
  }, [index, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    
    // Update the place details at the current index
    storedPlaces[index] = formData;
    localStorage.setItem('places', JSON.stringify(storedPlaces)); // Update localStorage

    navigate('/main'); // Redirect to main page after saving changes
  };

  return (
    <div className="container">
      <h1 className="form-title">Газрыг засах</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Газарын нэр"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Тайлбар"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Байршил"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {formData.image && (
          <img src={formData.image} alt="Preview" className="place-image-preview" />
        )}
        <button type="submit">Хадгалах</button>
      </form>
    </div>
  );
}

export default EditPlacePage;
