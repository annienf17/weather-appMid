import React, { useState } from "react";
import "./WeatherForm.css";

interface WeatherFormProps {
  onSearch: (location: string) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ onSearch }) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="weather-form">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="weather-input"
        />
        <button type="submit" className="weather-button">
          Search
        </button>
      </div>
    </form>
  );
};

export default WeatherForm;
