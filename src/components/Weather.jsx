import { useState } from "react";
import axios from "axios";

// Key is read from the .env file (must start with REACT_APP_ in Create React App)
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function Weather() {
  // State: what the user typed, the API result, any error, and a loading flag
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault(); // stop the form from reloading the page

    const query = city.trim();
    if (!query) {
      setWeather(null);
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Template literal puts the user's input directly into the URL
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        query
      )}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError(`"${query}" was not found. Check the spelling and try again.`);
      } else if (err.response?.status === 401) {
        setError("Invalid API key. Check your .env file and restart the app.");
      } else if (err.request) {
        setError("Network error. Check your internet connection and try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-xl">
      {/* Search form */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="city" className="sr-only">
          City name
        </label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city"
          className="flex-1 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-4 focus:ring-white/40"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-white/40 disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <p
          role="alert"
          className="mt-6 rounded-xl bg-red-500/90 px-4 py-3 text-center text-sm font-medium"
        >
          {error}
        </p>
      )}

      {/* Weather result */}
      {weather && (
        <article className="mt-8 rounded-2xl bg-white/15 p-6 shadow-xl backdrop-blur">
          <header className="text-center">
            <h2 className="text-2xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="mx-auto h-24 w-24"
            />
            <p className="temp-display font-bold leading-none">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="mt-2 capitalize text-white/80">
              {weather.weather[0].description}
            </p>
          </header>

          {/* Grid: 2 columns on phones, 4 columns on larger screens */}
          <dl className="mt-6 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <Detail label="Feels like" value={`${Math.round(weather.main.feels_like)}°C`} />
            <Detail label="Humidity" value={`${weather.main.humidity}%`} />
            <Detail label="Wind" value={`${weather.wind.speed} m/s`} />
            <Detail label="Pressure" value={`${weather.main.pressure} hPa`} />
          </dl>
        </article>
      )}
    </section>
  );
}

// Small helper component for one stat box
function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-white/10 px-2 py-3">
      <dt className="text-xs text-white/70">{label}</dt>
      <dd className="mt-1 text-lg font-semibold">{value}</dd>
    </div>
  );
}

export default Weather;
