import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

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
      <h3>{user}'s Favorite Locations</h3>
      <input
        type="text"
        value={newLocation}
        onChange={(e) => setNewLocation(e.target.value)}
        placeholder="Add new location"
      />
      <button onClick={handleAddFavorite}>Add</button>
      <ul>
        {favorites.map((location) => (
          <li key={location}>
            <span
              onClick={() => onLocationClick(location)}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {location}
            </span>{" "}
            <button onClick={() => removeFavorite(location)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteLocations;
