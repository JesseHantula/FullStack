import Weather from './Weather'

const Country = ( {country} ) => {
    const languages = Object.values(country.languages)
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital} <br />
                area {country.area}
            </p>

            <h4>Languages</h4>
            <ul>
            {(languages).map((language, index) => (
                <li key={index}>{language}</li>
            ))}
            </ul>
            <span style={{ fontSize: '8em' }}>{country.flag}</span>
            <Weather country={country} />
        </div>
    )
}

export default Country