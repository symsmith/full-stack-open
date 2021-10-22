import { useState, useEffect } from "react"
import axios from "axios"

const Countries = ({ countries }) => {
  if (countries.length === 0) return <p>No country found</p>
  else if (countries.length === 1) {
    const country = countries[0]
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
      </>
    )
  } else if (countries.length <= 10)
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
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
