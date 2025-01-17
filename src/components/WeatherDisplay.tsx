import React, { useState } from "react";

export interface WeatherData {
  name: string;
  timezone: number;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const formatTime = (timestamp: number, timezone: number) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const temperature = isCelsius
    ? data.main.temp
    : (data.main.temp * 9) / 5 + 32;
  const roundedTemperature = Math.round(temperature);
  const temperatureUnit = isCelsius ? "°C" : "°F";

  return (
    <div>
      <h2>Weather in {data.name}</h2>
      <p>
        Date: {new Date((data.dt + data.timezone) * 1000).toLocaleDateString()}
      </p>
      <p>Current Time: {formatTime(data.dt, data.timezone)}</p>
      <p>
        Temperature: {roundedTemperature}
        {temperatureUnit}
      </p>
      <button onClick={toggleTemperatureUnit}>
        Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>
      <p>Condition: {data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Pressure: {data.main.pressure} hPa</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
      <p>Wind Direction: {data.wind.deg}°</p>
      <p>Cloudiness: {data.clouds.all}%</p>
      <p>Visibility: {data.visibility} meters</p>
      <p>Sunrise: {formatTime(data.sys.sunrise, data.timezone)}</p>
      <p>Sunset: {formatTime(data.sys.sunset, data.timezone)}</p>
    </div>
  );
};

export default WeatherDisplay;
