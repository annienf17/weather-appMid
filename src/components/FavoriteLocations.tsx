import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const FavoriteLocations: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState("");
  const { user } = useContext(AuthContext);

  const addFavorite = () => {
    if (newLocation.trim() && !favorites.includes(newLocation)) {
      setFavorites([...favorites, newLocation]);
      setNewLocation("");
    }
  };

  const removeFavorite = (location: string) => {
    setFavorites(favorites.filter((fav) => fav !== location));
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
      <button onClick={addFavorite}>Add</button>
      <ul>
        {favorites.map((location) => (
          <li key={location}>
            {location}{" "}
            <button onClick={() => removeFavorite(location)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteLocations;
