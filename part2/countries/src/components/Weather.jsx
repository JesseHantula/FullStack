import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY
  const countryCode = country.cca2
  const city = country.capital
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=${api_key}`

  const hook = () => {
    axios.get(api_url)
      .then(response => setWeather(response.data))
      .catch(error => console.error('Error fetching weather data:', error))
  }

  useEffect(hook, [country.name])

  if (!weather) {
    return <div>Loading weather data...</div>
  }

  const temp = Math.round(weather.main.temp - 273.15)
  const iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`

  console.log(weather)

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature is {temp} Celsius</p>
      <img src={iconUrl} alt="Weather Icon" style={{ width: '100px', height: '100px' }}/>
      <p>Wind speed {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather