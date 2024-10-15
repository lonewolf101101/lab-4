import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  
  // Get the logged-in user
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Fetch places from localStorage
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    
    // Filter places for the logged-in user
    const userPlaces = storedPlaces.filter(place => place.user === user.username);
    setPlaces(userPlaces);
  }, [user.username]);

  const goToDetails = (index) => {
    navigate(`/details/${index}`); // Navigate to the details page for the selected place
  };

  // Function to delete a place
  const handleDeletePlace = (index) => {
    const updatedPlaces = places.filter((_, i) => i !== index); // Remove the place at the specified index
    setPlaces(updatedPlaces); // Update the state

    // Update the full places list in localStorage
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    const newPlaces = storedPlaces.filter((_, i) => {
      return !(storedPlaces[i].user === user.username && i === index); // Keep places that are not deleted
    });

    localStorage.setItem('places', JSON.stringify(newPlaces)); // Update localStorage
  };

  return (
    <div className="container">
      <h1 className="form-title">Газрын жагсаалт</h1>
      {places.length > 0 ? (
        <div className="place-list">
          {places.map((place, index) => (
            <div key={index} className="place-card">
              <h3 onClick={() => goToDetails(index)}>{place.name}</h3>
              <p>Дэлгэрэнгүй мэдээлэл үзэх</p>
              <button onClick={() => handleDeletePlace(index)}>Устгах</button> {/* Delete button */}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-places">Одоогоор газар нэмэгдээгүй байна.</p> 
      )}
      <button onClick={() => navigate('/add-location')}>Газар нэмэх</button> {/* "Add Location" */}
    </div>
  );
}

export default MainPage;
