import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureHigh,
  faTint,
  faWind,
  faCloud,
  faEye,
  faTachometerAlt,
  faSun,
  faCloudSun,
  faCloudRain,
  faSnowflake,
  faSmog,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css"; // Import the CSS file

export interface WeatherData {
  currentWeather: {
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
  };
  forecast: {
    city: {
      name: string;
      timezone: number;
    };
    list: {
      dt: number;
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
    }[];
  };
}

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const [showForecast, setShowForecast] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);

  const formatTime = (timestamp: number, timezone: number) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (timestamp: number, timezone: number) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleDateString();
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertTemperature = (temp: number) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  const temperatureUnit = isCelsius ? "°C" : "°F";

  const getConditionIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case "clear sky":
        return faSun;
      case "few clouds":
        return faCloudSun;
      case "scattered clouds":
      case "broken clouds":
        return faCloud;
      case "shower rain":
      case "rain":
        return faCloudRain;
      case "thunderstorm":
        return faBolt;
      case "snow":
        return faSnowflake;
      case "mist":
        return faSmog;
      default:
        return faCloud;
    }
  };

  // Filter the data to get 1 forecast per day for 3 days
  const filteredForecasts = data.forecast.list
    .filter((_, index) => index % 8 === 0)
    .slice(0, 3);

  return (
    <div>
      <h2>Weather in {data.currentWeather.name}</h2>
      <button onClick={() => setShowForecast(!showForecast)}>
        {showForecast ? "Show Current Weather" : "Show 3-Day Forecast"}
      </button>
      <button onClick={toggleTemperatureUnit}>
        Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>
      {showForecast ? (
        <div>
          <h3>3-Day Forecast</h3>
          <ul>
            {filteredForecasts.map((forecast, index) => (
              <li key={index}>
                <p className="date">
                  <strong>Date:</strong>{" "}
                  {formatDate(forecast.dt, data.forecast.city.timezone)}
                </p>
                <p>
                  Time: {formatTime(forecast.dt, data.forecast.city.timezone)}
                </p>
                <p>
                  <FontAwesomeIcon icon={faTemperatureHigh} className="icon" />{" "}
                  Temperature:{" "}
                  {Math.round(convertTemperature(forecast.main.temp))}
                  {temperatureUnit}
                </p>
                <p>
                  <FontAwesomeIcon icon={faTint} className="icon" /> Humidity:{" "}
                  {forecast.main.humidity}%
                </p>
                <p>
                  <FontAwesomeIcon icon={faTachometerAlt} className="icon" />{" "}
                  Pressure: {forecast.main.pressure} hPa
                </p>
                <p>
                  <FontAwesomeIcon icon={faWind} className="icon" /> Wind Speed:{" "}
                  {forecast.wind.speed} m/s
                </p>
                <p>
                  <FontAwesomeIcon icon={faWind} className="icon" /> Wind
                  Direction: {forecast.wind.deg}°
                </p>
                <p>
                  <FontAwesomeIcon icon={faCloud} className="icon" />{" "}
                  Cloudiness: {forecast.clouds.all}%
                </p>
                <p>
                  <FontAwesomeIcon icon={faEye} className="icon" /> Visibility:{" "}
                  {forecast.visibility} meters
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={getConditionIcon(forecast.weather[0].description)}
                    className="icon"
                  />{" "}
                  Condition: {forecast.weather[0].description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p className="date">
            <strong>Date:</strong>{" "}
            {formatDate(data.currentWeather.dt, data.currentWeather.timezone)}
          </p>
          <p>
            Current Time:{" "}
            {formatTime(data.currentWeather.dt, data.currentWeather.timezone)}
          </p>
          <p>
            <FontAwesomeIcon icon={faTemperatureHigh} className="icon" />{" "}
            Temperature:{" "}
            {Math.round(convertTemperature(data.currentWeather.main.temp))}
            {temperatureUnit}
          </p>
          <p>
            <FontAwesomeIcon icon={faTint} className="icon" /> Humidity:{" "}
            {data.currentWeather.main.humidity}%
          </p>
          <p>
            <FontAwesomeIcon icon={faTachometerAlt} className="icon" />{" "}
            Pressure: {data.currentWeather.main.pressure} hPa
          </p>
          <p>
            <FontAwesomeIcon icon={faWind} className="icon" /> Wind Speed:{" "}
            {data.currentWeather.wind.speed} m/s
          </p>
          <p>
            <FontAwesomeIcon icon={faWind} className="icon" /> Wind Direction:{" "}
            {data.currentWeather.wind.deg}°
          </p>
          <p>
            <FontAwesomeIcon icon={faCloud} className="icon" /> Cloudiness:{" "}
            {data.currentWeather.clouds.all}%
          </p>
          <p>
            <FontAwesomeIcon icon={faEye} className="icon" /> Visibility:{" "}
            {data.currentWeather.visibility} meters
          </p>
          <p>
            <FontAwesomeIcon
              icon={getConditionIcon(
                data.currentWeather.weather[0].description
              )}
              className="icon"
            />{" "}
            Condition: {data.currentWeather.weather[0].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
