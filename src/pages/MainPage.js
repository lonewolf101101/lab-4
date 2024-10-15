import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MainPage() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Use id from the URL params

  // Get the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    // Fetch places from localStorage
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    
    // Filter places based on the id from the URL (not the user)
    const filteredPlaces = storedPlaces.filter(place => place.user === id);
    setPlaces(filteredPlaces);
  }, [id]);

  // Function to navigate to the details page using index
  const goToDetails = (index) => {
    navigate(`/${id}/${index}`); // Navigate using id and the index of the place
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
              <h3 onClick={() => goToDetails(index)}>{place.name}</h3> {/* Pass the index */}
              <p>Дэлгэрэнгүй мэдээлэл үзэх</p>
              {user && (
                <button onClick={() => handleDeletePlace(index)}>Устгах</button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-places">Одоогоор газар нэмэгдээгүй байна.</p>
      )}
      {user && (
        <button onClick={() => navigate('/add-location')}>Газар нэмэх</button>
      )}
    </div>
  );
}

export default MainPage;
