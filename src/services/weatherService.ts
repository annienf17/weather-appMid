const API_KEY = "04c6c26f344681bc2d78062defe63d20";
const CURRENT_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const fetchWeather = async (location: string) => {
  try {
    const currentWeatherResponse = await fetch(
      `${CURRENT_WEATHER_URL}?q=${location}&appid=${API_KEY}&units=metric`
    );
    if (!currentWeatherResponse.ok) {
      throw new Error("Failed to fetch current weather data");
    }
    const currentWeatherData = await currentWeatherResponse.json();

    const forecastResponse = await fetch(
      `${FORECAST_URL}?q=${location}&appid=${API_KEY}&units=metric`
    );
    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    const forecastData = await forecastResponse.json();

    return { currentWeather: currentWeatherData, forecast: forecastData };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
