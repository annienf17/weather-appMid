import { useState, useEffect } from "react";
import { fetchWeather } from "../services/weatherService";

const useWeather = (location: string) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      setError(null);
      const data = await fetchWeather(location);
      if (data) {
        setWeatherData(data);
      } else {
        setError("Failed to fetch weather data");
      }
      setLoading(false);
    };

    if (location) {
      getWeather();
    }
  }, [location]);

  return { weatherData, loading, error };
};

export default useWeather;
