import React, { useState } from 'react'

const Person = ({ person }) => <p>{person.name}: {person.number}</p>

const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas' }]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    if(persons.find((person) => person.name === newName )) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else if(newName === '') {
        window.alert('please enter a name with the corresponding number')
    }
    else {
    const numberObject = {name: newName, number: newNumber}
    setPersons(persons.concat(numberObject))
    setNewName('')
    setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <Person key={person.name} person={person} /> )}
    </div>
  )
}

export default App