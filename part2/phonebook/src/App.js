import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleValueChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNameSubmit = (event) => {
    event.preventDefault()
    if (persons.filter(e => e.name === newName).length === 0) {
      setPersons([...persons, { name: newName }])
    }
    else {
      alert(`${newName} is already added to the phonebook`)
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNameSubmit}>
        <div>
          name: <input value={newName} onChange={handleValueChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  )
}

export default App
