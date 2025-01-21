import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "./FavoriteLocations.css"; // Import the CSS file

interface FavoriteLocationsProps {
  onLocationClick: (location: string) => void;
}

const FavoriteLocations: React.FC<FavoriteLocationsProps> = ({
  onLocationClick,
}) => {
  const [newLocation, setNewLocation] = useState("");
  const { user, favorites, addFavorite, removeFavorite } = useAuth();

  if (!user) {
    return null; // Ensure the component does not render if the user is not logged in
  }

  const handleAddFavorite = () => {
    if (newLocation.trim()) {
      const formattedLocation =
        newLocation.charAt(0).toUpperCase() + newLocation.slice(1);
      addFavorite(formattedLocation);
      setNewLocation("");
    }
  };

  return (
    <div>
      <h3>{user}'s Favourite Locations</h3>
      <div className="favorite-form">
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="Add new location"
          className="favorite-input common-input"
        />
        <button onClick={handleAddFavorite} className="favorite-button">
          Add
        </button>
      </div>
      <ul className="favorite-list">
        {favorites.map((location) => (
          <li key={location} className="favorite-item">
            <span
              onClick={() => onLocationClick(location)}
              className="favorite-location"
            >
              {location}
            </span>
            <button
              onClick={() => removeFavorite(location)}
              className="remove-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteLocations;
