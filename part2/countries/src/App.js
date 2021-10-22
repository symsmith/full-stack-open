import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({ country }) => {
  const [weather, setWeather] = useState({})
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    axios
      .get(
        "https://pro.openweathermap.org/data/2.5/weather?q=" +
          country.capital[0] +
          "&appid=" +
          process.env.REACT_APP_WEATHER_API_KEY +
          "&units=metric"
      )
      .then((result) => {
        console.log(result.data)
        setWeather(result.data)
        setLoaded(true)
      })
  }, [country.capital])

  if (loaded)
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <h2>Languages</h2>
        <ul>
          {Object.keys(country.languages).map((lang) => (
            <li key={country.languages[lang]}>{country.languages[lang]}</li>
          ))}
        </ul>
        <img
          width="200px"
          src={country.flags.svg}
          alt={`flag of ${country.name.common}`}
        />
        <h2>Weather in {country.capital[0]}</h2>
        <p>
          <strong>temperature: {Math.floor(weather.main.temp)}&deg;C</strong>
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <p>
          <strong>wind: {weather.wind.speed} m/s</strong>
        </p>
      </>
    )
  else return null
}

const Countries = ({ countries }) => {
  const [countryShown, setCountryShown] = useState({})

  if (countries.length === 0) return <p>No country found</p>
  else if (countries.length === 1) {
    const country = countries[0]
    return <Country country={country} />
  } else if (countries.length <= 10)
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            {countryShown.name &&
            countryShown.name.common === country.name.common ? (
              <button onClick={() => setCountryShown({})}>hide</button>
            ) : (
              <button onClick={() => setCountryShown(country)}>show</button>
            )}{" "}
            {country.name.common}
            {countryShown.name &&
            countryShown.name.common === country.name.common ? (
              <Country country={countryShown} />
            ) : null}
          </li>
        ))}
      </ul>
    )
  else return <p>Too many countries to show</p>
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((result) => {
      setCountries(result.data)
    })
  }, [])

  const countriesShown = countries.filter((e) =>
    e.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const onSearchChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      find countries <input value={search} onChange={onSearchChange} />
      <Countries countries={countriesShown} />
    </div>
  )
}

export default App
