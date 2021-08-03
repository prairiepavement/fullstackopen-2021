import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'

import phoneService from './services/phones'

const App = () => {
  const [persons, setPersons] = useState([])    
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialList => {
        setPersons(initialList)
      })
}, [])

  const personList = (filter === '')
    ? persons
    : persons.filter(
      person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )

  const addNumber = (event) => {
    event.preventDefault()
    
    const personInPhonebook = persons.find((person) => person.name === newName)
      if (personInPhonebook) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const replacePerson = { ...personInPhonebook, number: newNumber }
          phoneService
            .update(personInPhonebook.id, replacePerson)
            .then(returnedPerson => {

              setNotificationMessage(`'${returnedPerson.name}' updated successfully`)
              setTimeout(() => {setNotificationMessage(null)}, 5000)

              setPersons(persons.map(person => person.name !== personInPhonebook.name ? person : replacePerson))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setErrorMessage(`The number of '${personInPhonebook.name}' was removed from server`)
              setTimeout(() => {setErrorMessage(null)}, 5000)
              setPersons(persons.filter(p => p.name !== personInPhonebook.name))
            })
        }
      }
    
    else {
      const numberObject = { name: newName, number: newNumber }
        phoneService
          .create(numberObject)
          .then(returnedPhone  => {

            setNotificationMessage(`Added '${returnedPhone.name}'`)
            setTimeout(() => {setNotificationMessage(null)}, 5000)

            setPersons(persons.concat(returnedPhone))
            setNewName('')
            setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleOnClickDelete = (event) => {
    const name = event.target.name

    if (window.confirm(`Delete '${name}'?`)) {
      const id = event.target.value
        phoneService
          .del(id)
          .then((req) => {
            setNotificationMessage(`'${name}' deleted successfully`)
            setTimeout(() => {setNotificationMessage(null)}, 5000)
            setPersons(persons.filter(p => p.name !== name))
          })
          .catch(error => {
            setErrorMessage(`The number of '${name}' has already been removed from server`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
            setPersons(persons.filter(p => p.name !== name))
          })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter filter={filter} onChangeHandler={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmitHandler={addNumber}
        name={newName}
        onChangeNameHandler={handleNameChange}
        number={newNumber}
        onChangeNumberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personList} onClickHandler={handleOnClickDelete}/>
    </div>
  )
}

export default App