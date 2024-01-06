import Country from './Country'

const Countries = ( {countries, handleFilterChange} ) => {
    if (countries.length > 10 && countries.length < 250) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (countries.length === 1) {
        return (
            <div>
                <Country country={countries[0]} />
            </div>
        )
    }
    else if (countries.length < 11) {
        return (
            countries.map((country) => (
                <div>
                <div key={country.id}>
                  {country.name.common}
                </div>
                <button value={country.name.common} onClick={handleFilterChange}>show</button>
                </div>
              ))
        )
    }
}

export default Countries