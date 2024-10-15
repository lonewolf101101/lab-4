import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetailsPage() {
  const { id, placeId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [place, setPlace] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    image: null
  });

  useEffect(() => {
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    const placeIndex = parseInt(placeId, 10);

    if (placeIndex >= 0 && placeIndex < storedPlaces.length) {
      const selectedPlace = storedPlaces[placeIndex];
      setPlace(selectedPlace);
      setFormData({
        name: selectedPlace.name,
        description: selectedPlace.description,
        location: selectedPlace.location,
        image: selectedPlace.image
      });
    }
  }, [placeId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle between edit and view mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSave = () => {
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    const placeIndex = parseInt(placeId, 10);

    // Preserve the existing user field when updating the place
    const updatedPlace = {
      ...storedPlaces[placeIndex], // Keep all original data, including the user
      name: formData.name,
      description: formData.description,
      location: formData.location,
      image: formData.image || storedPlaces[placeIndex].image // Keep old image if not updated
    };

    storedPlaces[placeIndex] = updatedPlace; // Update the selected place
    localStorage.setItem('places', JSON.stringify(storedPlaces)); // Save updated places to localStorage

    setPlace(updatedPlace); // Update state
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="container">
      {place ? (
        <>
          <h1 className="form-title">{isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          ) : place.name}</h1>

          {place.image && !isEditing && (
            <img src={place.image} alt={place.name} className="place-image" />
          )}
          
          {isEditing && (
            <input type="file" accept="image/*" onChange={handleImageChange} />
          )}

          <p>
            <strong>Тайлбар:</strong> {isEditing ? (
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            ) : place.description}
          </p>
          
          <p>
            <strong>Байршил:</strong> {isEditing ? (
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            ) : place.location}
          </p>

          <button onClick={() => navigate(-1)}>Буцах</button>

          {isEditing ? (
            <button onClick={handleSave}>Хадгалах</button>
          ) : (
            user && 
            (<button onClick={handleEditToggle}>Засах</button>)
          )}
        </>
      ) : (
        <p>Газар олдсонгүй.</p>
      )}
    </div>
  );
}

export default DetailsPage;
