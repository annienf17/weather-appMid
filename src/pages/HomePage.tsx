import React, { useState, useEffect, useContext } from "react";
import WeatherForm from "../components/WeatherForm";
import WeatherDisplay from "../components/WeatherDisplay";
import FavoriteLocations from "../components/FavoriteLocations";
import { AuthContext } from "../contexts/AuthContext";
import { fetchWeather } from "../services/weatherService";

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
      <h1>Welcome to the Weather App</h1>
      <WeatherForm onSearch={setLocation} />
      {weatherData && <WeatherDisplay data={weatherData} />}
      {user && <FavoriteLocations />}
    </div>
  );
};

export default HomePage;
