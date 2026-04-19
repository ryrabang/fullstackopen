const CountryFilter = ({ countryFilter, handleCountryFilterChange }) => {
  return (
    <p>
      find countries{" "}
      <input value={countryFilter} onChange={handleCountryFilterChange} />
    </p>
  )
}

export default CountryFilter
