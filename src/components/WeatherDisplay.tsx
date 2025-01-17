import React, { useState } from "react";

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

  // Filter the data to get 3 forecasts per day for 3 days
  const filteredForecasts = data.forecast.list
    .filter((_, index) => index % 8 === 0)
    .slice(0, 9);

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
                <p>
                  Date: {formatDate(forecast.dt, data.forecast.city.timezone)}
                </p>
                <p>
                  Time: {formatTime(forecast.dt, data.forecast.city.timezone)}
                </p>
                <p>
                  Temperature:{" "}
                  {Math.round(convertTemperature(forecast.main.temp))}
                  {temperatureUnit}
                </p>
                <p>Condition: {forecast.weather[0].description}</p>
                <p>Humidity: {forecast.main.humidity}%</p>
                <p>Pressure: {forecast.main.pressure} hPa</p>
                <p>Wind Speed: {forecast.wind.speed} m/s</p>
                <p>Wind Direction: {forecast.wind.deg}°</p>
                <p>Cloudiness: {forecast.clouds.all}%</p>
                <p>Visibility: {forecast.visibility} meters</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>
            Date:{" "}
            {formatDate(data.currentWeather.dt, data.currentWeather.timezone)}
          </p>
          <p>
            Current Time:{" "}
            {formatTime(data.currentWeather.dt, data.currentWeather.timezone)}
          </p>
          <p>
            Temperature:{" "}
            {Math.round(convertTemperature(data.currentWeather.main.temp))}
            {temperatureUnit}
          </p>
          <p>Condition: {data.currentWeather.weather[0].description}</p>
          <p>Humidity: {data.currentWeather.main.humidity}%</p>
          <p>Pressure: {data.currentWeather.main.pressure} hPa</p>
          <p>Wind Speed: {data.currentWeather.wind.speed} m/s</p>
          <p>Wind Direction: {data.currentWeather.wind.deg}°</p>
          <p>Cloudiness: {data.currentWeather.clouds.all}%</p>
          <p>Visibility: {data.currentWeather.visibility} meters</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
