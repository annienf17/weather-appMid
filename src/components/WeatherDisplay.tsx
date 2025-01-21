import React, { useState, useEffect } from "react";
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
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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

  // Filter the data to get 1 forecast per day for 7 days
  const filteredForecasts = data.forecast.list
    .filter((_, index) => index % 8 === 0)
    .slice(0, 7);

  // Prepare data for charts
  const chartData = {
    labels: filteredForecasts.map((forecast) =>
      formatDate(forecast.dt, data.forecast.city.timezone)
    ),
    datasets: [
      {
        label: "Temperature",
        data: filteredForecasts.map((forecast) =>
          convertTemperature(forecast.main.temp)
        ),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Humidity",
        data: filteredForecasts.map((forecast) => forecast.main.humidity),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Pressure",
        data: filteredForecasts.map((forecast) => forecast.main.pressure),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  // Chart options to change text color to white
  const chartOptions = {
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "5-Day Weather Forecast",
        color: "white",
      },
    },
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <h2>Weather in {data.currentWeather.name}</h2>
      <button onClick={() => setShowForecast(!showForecast)}>
        {showForecast ? "Show Current Weather" : "Show 5-Day Forecast"}
      </button>
      <button onClick={toggleTemperatureUnit}>
        Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>
      {showForecast ? (
        <div>
          <h3>5-Day Forecast</h3>
          <Line data={chartData} options={chartOptions} />
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
