import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{
    name: 'Arto Hellas',
    number: '03 20 54 48 61'
  }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.filter(e => e.name === newName).length === 0) {
      setPersons([...persons, { name: newName, number: newNumber }])
    }
    else {
      alert(`${newName} is already added to the phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input required value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input required value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name} &mdash; {person.number}</p>
      ))}
    </div>
  )
}

export default App
