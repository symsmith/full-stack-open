import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteringValue, setFilteringValue] = useState('')

  let entriesShown = persons.filter(e => e.name.toLowerCase().includes(filteringValue.toLowerCase()))

  const handleFilteringChange = (event) => {
    setFilteringValue(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.filter(e => e.name === newName).length === 0) {
      setPersons([...persons, { name: newName, number: newNumber, id: persons.length + 1 }])
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
      <div>
        filter with <input value={filteringValue} onChange={handleFilteringChange} />
      </div>
      <h2>Add a new entry</h2>
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
      {entriesShown.map((person) => (
        <p key={person.name}>{person.name} &mdash; {person.number}</p>
      ))}
    </div>
  )
}

export default App
