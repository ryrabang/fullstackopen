import { useState } from "react"
import Country from "./Country"

const CountryList = ({ countries }) => {
  const [showCountry, setShowCountry] = useState(null)

  const handleShowClick = (country) => {
    if (showCountry && showCountry.name.official === country.name.official) {
      setShowCountry(null)
      return
    }
    setShowCountry(country)
  }
  return (
    <>
      <ul>
        {countries.map((country) => {
          const label =
            country.name.official === (showCountry?.name.official ?? "")
              ? "Hide"
              : "Show"
          return (
            <li key={country.name.official}>
              {country.name.common}
              <button onClick={() => handleShowClick(country)}>{label}</button>
            </li>
          )
        })}
      </ul>
      {showCountry && <Country country={showCountry} />}
    </>
  )
}

export default CountryList
