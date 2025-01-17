const API_KEY = "04c6c26f344681bc2d78062defe63d20";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (location: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${location}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
