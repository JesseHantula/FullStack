import { useState, useEffect } from 'react'
import './styles.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filteredNames, setFilteredNames] = useState(persons)
  const [notification, setNotification] = useState(null)

  const hook = () => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    const string = event.target.value.toLowerCase()
    if (string.length > 0) {
      setShowAll(false)
      const filteredList = persons.filter(person => person.name.toLowerCase().includes(string));
      setFilteredNames(filteredList)
    }
    else {
      setShowAll(true)
      setFilteredNames(persons)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (checkName()) {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification({
          'message': `${returnedPerson.name} added`,
          'type': 'success'})
        setTimeout(() => {
          setNotification(null)
      }, 5000)
      })
    }
    else {
      const message = `${newName} is already added to phonebook, 
      replace the old number with new one?`
      if (window.confirm(message)) {
        const p = persons.find(person => person.name === newName)
        personService.update(p.id, personObject).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== p.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({
            'message': `${returnedPerson.name} number changed to ${returnedPerson.number}`,
            'type': 'success'})
          setTimeout(() => {
            setNotification(null)
        }, 5000)
        }).catch(error => {
          setNotification({
            'message': `Information of ${newName} already removed`,
            'type': 'error'
          })
          setTimeout(() => {
            setNotification(null)
        }, 5000)
        })
      }
    }
  }

  const deletePerson = (event) => {
    event.preventDefault()
    const id = parseInt(event.target.id)
    const name = event.target.name
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      personService.deletePerson(id).then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== id))
      }).catch(error => {
        setNotification({
          'message': `The contact '${name}' was already deleted from server`,
          'type': 'error'
        })
        setPersons(persons.filter(person => person.id !== id))
        setTimeout(() => {
          setNotification(null)
      }, 5000)
      })
    }
  }

  const checkName = () => {
    const names = persons.map(person => person.name)
    return !names.includes(newName)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const namesToShow = showAll ? persons : filteredNames

  return (
    <div>
      <h2>Phonebook</h2>
        { notification !== null ? <Notification message={notification} /> : null }
        <Filter handleFilterChange = {handleFilterChange} />
      <h2>Add new number</h2>
        <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
        <Persons namesToShow = {namesToShow} deletePerson = {deletePerson} />
    </div>
  )
}

export default App