import React, { useState, useEffect, useContext } from "react";
import WeatherForm from "../components/WeatherForm";
import WeatherDisplay from "../components/WeatherDisplay";
import FavoriteLocations from "../components/FavoriteLocations";
import { AuthContext } from "../contexts/AuthContext";
import { fetchWeather } from "../services/weatherService";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const { user } = useContext(AuthContext);

  const handleFetchWeather = async (location: string) => {
    const data = await fetchWeather(location);
    setWeatherData(data);
  };

  useEffect(() => {
    if (location) {
      handleFetchWeather(location);
    }
  }, [location]);

  return (
    <div>
      <h1>The Weather App</h1>
      <p>
        This application allows users to search for weather information for any
        location. Logged-in users can save their favorite locations for easy
        access during their session.
      </p>
      <WeatherForm onSearch={setLocation} />
      {weatherData && <WeatherDisplay data={weatherData} />}
      {user ? (
        <FavoriteLocations onLocationClick={handleFetchWeather} />
      ) : (
        <p>
          <Link to="/login">Login</Link> to save your favorite locations.
        </p>
      )}
    </div>
  );
};

export default HomePage;
