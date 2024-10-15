import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetailsPage() {
  const { index } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    const user = JSON.parse(localStorage.getItem('user')); // Get the logged-in user
  
    // Check if the index is a valid number
    const placeIndex = parseInt(index, 10);
    if (placeIndex >= 0 && placeIndex < storedPlaces.length) {
      const selectedPlace = storedPlaces[placeIndex];
  
      // Check if the selected place belongs to the current user
      if (selectedPlace.user === user.username) {
        setPlace(selectedPlace);
      } else {
        navigate('/main'); // Redirect if the place doesn't exist for the user
      }
    } else {
      navigate('/main'); // Redirect for invalid index
    }
  }, [index, navigate]);
  
  return (
    <div className="container">
      {place ? (
        <>
          <h1 className="form-title">{place.name}</h1>
          {place.image && <img src={place.image} alt={place.name} className="place-image" />}
          <p><strong>Тайлбар:</strong> {place.description}</p>
          <p><strong>Байршил:</strong> {place.location}</p>
          <button onClick={() => navigate('/main')}>Буцах</button>
        </>
      ) : (
        <p>Газар олдсонгүй.</p>
      )}
    </div>
  );
}

export default DetailsPage;
