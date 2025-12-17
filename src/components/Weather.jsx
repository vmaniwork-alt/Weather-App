import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => setCity(e.target.value);

  const getWeather = () => {
    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64c440e7a3e57e98d56279201b241f14`
    )
      .then((res) => {
        setWeather(res.data.weather[0].main);
        setDesc(res.data.weather[0].description);

        // 🔥 Kelvin → Celsius (rounded)
        const celsius = Math.round(res.data.main.temp - 273.15);
        setTemp(celsius);

        setError(false);
      })
      .catch(() => setError(true));
  };

  /* WEATHER → EMOJI */
  const weatherEmoji = () => {
    if (weather === "Clouds") return "☁️";
    if (weather === "Clear") return "☀️";
    if (weather === "Rain") return "🌧️";
    if (weather === "Thunderstorm") return "⛈️";
    if (weather === "Snow") return "❄️";
    if (weather === "Mist" || weather === "Fog") return "🌫️";
    return "🌤️";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-sky-900 to-purple-950 px-6">

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl p-5 md:p-10
        shadow-2xl border border-white/30 text-white">

        <h1 className="text-3xl font-bold text-center mb-6">🌦️ Weather App</h1>

        {/* INPUT */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter city name"
            onChange={handleChange}
            className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30
            placeholder-gray-300 focus:outline-none"
          />
          <button
            onClick={getWeather}
            className=" px-5 md:px-8 py-3 rounded-xl font-semibold
            bg-gradient-to-r from-purple-500 to-indigo-500
            hover:from-orange-500 hover:to-pink-500 transition-all"
          >
            Get
          </button>
        </div>

        {error && (
          <p className="text-center text-red-400 mb-4">
            City not found or network error
          </p>
        )}

        {weather && (
          <>
            <h2 className="text-center text-2xl font-semibold mb-8">
              📍 {city}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {/* WEATHER */}
              <div className="p-6 rounded-2xl bg-white/20 border border-white/30 text-center">
                <p className="text-gray-300">Weather</p>
                <p className="text-2xl font-bold mt-2 flex justify-center items-center gap-2">
                  <span className="text-3xl">{weatherEmoji()}</span>
                  {weather}
                </p>
              </div>

              {/* TEMP */}
              <div className="p-6 rounded-2xl bg-white/20 border border-white/30 text-center">
                <p className="text-gray-300">Temperature</p>
                <p className="text-3xl font-bold mt-2">
                  {temp}°C
                </p>
              </div>

              {/* DESC */}
              <div className="p-6 rounded-2xl bg-white/20 border border-white/30 text-center">
                <p className="text-gray-300">Description</p>
                <p className="text-2xl font-bold mt-2 capitalize">
                  {desc}
                </p>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
