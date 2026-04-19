import { useState, useEffect } from "react"

import countryService from "./services/countryService"
import CountrySection from "./components/CountrySection"
import CountryFilter from "./components/CountryFilter"

function App() {
  const [countryFilter, setCountryFilter] = useState("")
  const [countries, setCountries] = useState([])

  const filteredCountries = countryFilter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(countryFilter.toLowerCase()),
      )
    : []

  useEffect(() => {
    countryService.getAll().then((countryList) => setCountries(countryList))
  }, [])

  const handleCountryFilterChange = (e) => {
    setCountryFilter(e.target.value)
  }

  return (
    <>
      <CountryFilter
        countryFilter={countryFilter}
        handleCountryFilterChange={handleCountryFilterChange}
      />
      <CountrySection countries={filteredCountries} />
    </>
  )
}

export default App
