import { useState, useEffect } from "react"
import weatherService from "../services/weatherService"

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [lat, lon] = country.capitalInfo.latlng
  useEffect(() => {
    weatherService
      .getWeather(lat, lon)
      .then((newWeather) => setWeather(newWeather))
  }, [lat, lon])
  if (!weather) {
    return null
  }
  const icon = `https://openweathermap.org/payload/api/media/file/${weather?.weather[0].icon}.png`

  return (
    <>
      <h1>Weather in {country.capital[0]}</h1>
      <p>Temperature {weather.main.temp} Celcius</p>
      <img src={icon} alt={weather.weather.description} />
      <p>Wind {weather.wind.speed} m/s</p>
    </>
  )
}

export default Weather
