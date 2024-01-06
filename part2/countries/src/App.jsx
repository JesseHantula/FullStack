import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').
      then(response => setCountries(response.data))
  }
  
  useEffect(hook, [])

  const filterCountries = (filter) => {
    const string = filter.toLowerCase()
    const filteredCountries = countries.filter(country => 
      (country.name.common.toLowerCase().includes(string)))
    return filteredCountries
  }

  const handleFilterChange = (event) => {
    const string = event.target.value.toLowerCase()
    if (string.length > 0) {
      setFilter(string)
    }
    else {
      setFilter('')
    }
  }

  const countriesToUse = filter.length === 0 ? countries : filterCountries(filter)
  return (
    <>
      <div>
        <Filter handleFilterChange = {handleFilterChange} />
        <Countries countries = {countriesToUse} handleFilterChange={handleFilterChange} />
      </div>
    </>
  )
}

export default App
