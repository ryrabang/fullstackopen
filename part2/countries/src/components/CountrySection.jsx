import CountryList from "./CountryList"
import Country from "./Country"

const CountrySection = ({ countries }) => {
  const countriesLength = countries.length
  if (countriesLength === 1) {
    return <Country country={countries[0]} />
  }
  if (countriesLength > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (countriesLength === 0) {
    return <p>No matches, specify another filter</p>
  }
  return <CountryList countries={countries} />
}

export default CountrySection
