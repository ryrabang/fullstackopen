import axios from "axios"

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"

const apiKey = import.meta.env.VITE_SOME_KEY

const getWeather = (lat, lon) => {
  return axios
    .get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then((response) => response.data)
}

export default {
  getWeather,
}
